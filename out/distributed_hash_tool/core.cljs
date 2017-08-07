(ns distributed-hash-tool.core
  (:require [quil.core :as q :include-macros true]
            [quil.middleware :as m]))

(enable-console-print!)

(def alphabet-range "abcdefghijklmnopqrstuvwxyz")

(def colors [[237 106 90]
             [155 193 188]
             [54  201 198]
             [21  113  69]
             [240 235 216]])

(def grays [[128 128 128]
            [169 169 169]
            [211 211 211]
            [245 245 245]])

(defn keywordize [index]
  (-> index (str) (keyword)))

(defn initialize-node
 ;; ([node-index] (swap! data assoc (keywordize node-index) (list)))
  ([container node-index] (assoc container (keywordize node-index) #{})))

(defn initialize-nodes
;;  ([number-of-nodes] (doall (map initialize-node (range 1 (inc number-of-nodes)))))
  ([container number-of-nodes] (reduce initialize-node container (range 1 (inc number-of-nodes)))))

(def radius 150)

(defn origin [angle-in-degrees]
  (let [angle (q/radians 180)]
    {:x     (* radius (q/cos angle))
     :y     (* radius (q/sin angle))}))

(defn default-origin []
  (memoize (origin 180)))

(defn draw-origin []
  ; Set the circle color and draw the client.
  (q/fill 200 100 100)
  (q/ellipse (:x (default-origin)) (:y (default-origin)) 25 25))

(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; setup function returns initial state.
  (let [number-of-nodes 3]
  ;;  (initialize-nodes number-of-nodes)
    {:number-of-nodes 3
     :mode :put
     :data            {}
     :put-animation-map {}
     :get-animation-map {}}))


(defn increase-one-step [step]
  (if (< step radius)
    (inc step)
    step))

(defn decrease-one-step [step]
  (if (> step 0)
    (dec step)
    step))

(defn update-step [step-function animation-list]
  (map #(update % :step step-function) animation-list))

(defn update-animation-map [animation-map step-function]
  (let [map-keys (keys animation-map)
        map-vals (vals animation-map)
        updated-vals (map #(update-step step-function %) map-vals)
        updated-animation-map (zipmap map-keys updated-vals)]
    updated-animation-map))

(defn filter-step [step-predicate animation-list]
  (filter #(step-predicate (:step %)) animation-list))

(defn filter-animation-map [animation-map step-predicate]
  (let [map-keys (keys animation-map)
        map-vals (vals animation-map)
        filtered-vals (map #(filter-step step-predicate %) map-vals)
        filtered-animation-map (zipmap map-keys filtered-vals)]
    filtered-animation-map))



(defn update-state [state]
  ;;
  ;;
   (println (str "state=" state))
  ;;
  ;;

  (let [filtered-put-animation-map (filter-animation-map (:put-animation-map state) #(<= % 125.0))
        updated-put-animation-map (update-animation-map filtered-put-animation-map increase-one-step)
        filtered-get-animation-map (filter-animation-map (:get-animation-map state) #(> % 0.0))
        updated-get-animation-map (update-animation-map filtered-get-animation-map decrease-one-step)]
    (assoc state :put-animation-map updated-put-animation-map :get-animation-map updated-get-animation-map)))

(defn radian-positions [number-of-nodes]
  (let [spacer (/ 180 (inc number-of-nodes))
        ; Space the nodes out evenly along a semi-circle
        degree-positions (map #(* % spacer) (range 1 (inc number-of-nodes)))
        ; Translate those nodes to appear on the right-half of the screen
        translated-degree-positions (map #(mod (+ 270 %) 360) degree-positions)]
    (map q/radians translated-degree-positions)))

(defn slope [x1 y1 x2 y2]
  (let [delta-y (- y2 y1)
        delta-x (- x2 x1)]
    (/ delta-y delta-x)))

(defn slope-from-origin [x y]
  (slope (:x (default-origin)) (:y (default-origin)) x y))

(defn y-intercept-from-origin [slope]
  (- (:y (default-origin)) (* slope (:x (default-origin)))))

(defn distance [x1 y1 x2 y2]
  (let [delta-y (- y2 y1)
        delta-y-squrared (Math/pow delta-y 2)
        delta-x (- x2 x1)
        delta-x-squared (Math/pow delta-x 2)]
    (Math/sqrt (+ delta-y-squrared delta-x-squared))))

(defn distance-from-origin [x y]
  (distance (:x (default-origin)) (:y (default-origin)) x y))

(defn draw-data-point [node-x node-y data-point]
  (let [slope (slope-from-origin node-x node-y)
        y-intercept (y-intercept-from-origin slope)
        updated-x (+ (:x (default-origin)) (:step data-point))
        updated-y (+ (* slope updated-x) y-intercept)
        radius (distance-from-origin node-x node-y)
        updated-radius (distance-from-origin updated-x updated-y)]
    (apply q/fill (get colors (:color data-point)))
    (if (< updated-radius radius)
      (do
        (q/ellipse updated-x updated-y 25 25)
        ; Add the key label to the data point
        (q/fill 0 0 0)
        (q/text-align :center :center)
        (q/text (:name data-point) updated-x updated-y)))))

(defn draw-circle [coordinates put-animation-map get-animation-map index]
  (if (not (empty? coordinates))
    (let [[x y] (first coordinates)
          node-x (* radius x)
          node-y (* radius y)
          put-animation-list ((keywordize index) put-animation-map)
          get-animation-list ((keywordize index) get-animation-map)]
      ; Draw line from client to node
      (q/line (:x (default-origin)) (:y (default-origin)) node-x node-y)
      ; Color and draw node
      (apply q/fill (get grays (mod index (count grays))))
      (q/ellipse node-x node-y 50 50)
      ; Add the index label to the node
      (q/fill 0 0 0)
      (q/text-align :center :center)
      (q/text (str index) node-x node-y)
      (doall (map #(draw-data-point node-x node-y %) put-animation-list))
      (doall (map #(draw-data-point node-x node-y %) get-animation-list))
      (draw-circle (rest coordinates) put-animation-map get-animation-map (inc index)))))

(defn draw-circles [radian-positions put-animation-map get-animation-map]
  (let [coordinates (map #(vector (q/cos %) (q/sin %)) radian-positions)]
    (draw-circle coordinates put-animation-map get-animation-map 1)))

(defn draw-mode [mode]
  (q/fill 0 0 0)
  (q/text-align :center :center)
  (q/text-size 16)
  (q/text (str "Mode: " (name mode)) (+ radius 30) (+ radius 30)))

(defn draw-title []
  (q/fill 0 0 0)
  (q/text-align :center :center)
  (q/text-size 16)
  (q/text "Distributed Hash Tool" 0 (* -1 (+ radius 30))))

(defn draw-state [{:keys [number-of-nodes put-animation-map get-animation-map mode]}]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 240)
  (let [radian-positions (radian-positions number-of-nodes)]
    ; Move origin point to the center of the sketch.
    (q/with-translation [(/ (q/width) 2)
                         (/ (q/height) 2)]
                        (q/text-size 12)
                        (draw-circles radian-positions put-animation-map get-animation-map)
                        (draw-origin)
                        (draw-mode mode)
                        (draw-title))))

(defn simple-hash [key]
  (let [key-as-string (name key)]
    (.indexOf alphabet-range key-as-string)))

(defn node-equals? [node-entry key]
  (= (:key node-entry) key))

(defn node-contains? [node key]
  (let [node-equals-map (map #(node-equals? % key) node)
        node-contains? (reduce #(or %1 %2) false node-equals-map)]
    (println (str "node-contains?=" node-contains?))
    node-contains?))


(defn matching-node-index [state key]
  (let [number-of-nodes (:number-of-nodes state)]
    (-> key (simple-hash) (mod number-of-nodes) (inc) (keywordize))))


(defn key-animation-map [key step]
  {:key key
   :name (name key)
   :step step
   :color (-> key (simple-hash) (mod (count colors)))})

(defn node-put [state key]
  (let [matching-node-index (matching-node-index state key)
        possible-put-animation-list (-> state :put-animation-map matching-node-index)
        put-animation-list (if (nil? possible-put-animation-list) (list) possible-put-animation-list)
        updated-put-animation-list (conj put-animation-list (key-animation-map key 0.0))
        ;; update the data set as well
        possible-data-set (-> state :data matching-node-index)
        data-set (if (nil? possible-data-set) #{} possible-data-set)
        updated-data-set (conj data-set key)]
    (-> state
        (assoc-in [:put-animation-map matching-node-index] updated-put-animation-list)
        (assoc-in [:data matching-node-index] updated-data-set))))

(defn node-get [state key]
  (let [matching-node-index (matching-node-index state key)
        data-set (-> state :data matching-node-index)]
    (if (contains? data-set key)
      (let [possible-get-animation-list (-> state :get-animation-map matching-node-index)
            get-animation-list (if (nil? possible-get-animation-list) (list) possible-get-animation-list)
            updated-get-animation-list (conj get-animation-list (key-animation-map key 100.0))]
        (assoc-in state [:get-animation-map matching-node-index] updated-get-animation-list))
      state)))

(defn node-del [state key]
  (let [matching-node-index (matching-node-index state key)
        possible-data-set (-> state :data matching-node-index)
        data-set (if (nil? possible-data-set) #{} possible-data-set)
        updated-data-set (disj data-set key)]
    (assoc-in state [:data matching-node-index] updated-data-set)))

(defn rebalance-data [all-data-set new-number-of-nodes]
  (reduce #(let [matching-node-index (-> %2 (simple-hash) (mod new-number-of-nodes) (inc) (keywordize))
                 possible-matching-data-set (matching-node-index %1)
                 matching-data-set (if (nil? possible-matching-data-set) #{} possible-matching-data-set)]
             (assoc %1 matching-node-index (conj matching-data-set %2))) {} all-data-set))

(defn rebalance [data new-number-of-nodes]
  (let [data-vals (vals data)
        all-data-set (reduce #(into #{} (concat %1 %2)) #{} data-vals)
        rebalance-all-data (rebalance-data all-data-set new-number-of-nodes)]
    rebalance-all-data))

(defn key-press [state event]
  (let [{:keys [key key-code]} event
        {:keys [number-of-nodes data]} state
        valid-key (clojure.string/includes? alphabet-range (name key))
        inc-number-of-nodes (inc number-of-nodes)
        dec-number-of-nodes (dec number-of-nodes)]
    (cond
      (and (= key :up) (< number-of-nodes 20)) (-> state (assoc :number-of-nodes inc-number-of-nodes) (assoc-in [:data] (rebalance data inc-number-of-nodes)))
      (and (= key :down) (> number-of-nodes 1)) (-> state (assoc :number-of-nodes dec-number-of-nodes) (assoc-in [:data] (rebalance data dec-number-of-nodes)))
      (= key :right) (assoc state :mode :put)
      (= key :left) (assoc state :mode :get)
      (= key-code 32) (assoc state :mode :del)
      (and valid-key (= (:mode state) :put)) (node-put state key)
      (and valid-key (= (:mode state) :get)) (node-get state key)
      (and valid-key (= (:mode state) :del)) (node-del state key)
      :else state)))

(q/defsketch distributed-hash-tool
  :host "distributed-hash-tool"
  :size [500 500]
  ; setup function called only once, during sketch initialization.
  :setup setup
  ; update-state is called on each iteration before draw-state.
  :update update-state
  :draw draw-state
  :key-pressed key-press
  ; This sketch uses functional-mode middleware.
  ; Check quil wiki for more info about middlewares and particularly
  ; fun-mode.
  :middleware [m/fun-mode])
