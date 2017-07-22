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
  ([container node-index] (assoc container (keywordize node-index) (list))))

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
    {:color           0
     :angle           0
     :word            ""
     :number-of-nodes 3
     :data            (initialize-nodes {} number-of-nodes)}))


(defn update-one-step [step]
  (if (< step radius)
    (inc step)
    step))

(defn update-step [node-list]
  (map #(update % :step update-one-step) node-list))

(defn update-state [state]
;;   (println (str "state=" state))

  (let [data-keys (keys (:data state))
        data-vals (vals (:data state))
        updated-vals (map update-step data-vals)
        updated-data (zipmap data-keys updated-vals)]
    (assoc state :data updated-data)))

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
      (q/ellipse updated-x updated-y 25 25))))

(defn draw-circle [coordinates data index]
  (if (not (empty? coordinates))
    (let [[x y] (first coordinates)
          node-x (* radius x)
          node-y (* radius y)
          node-list ((keywordize index) data)]
      ; Draw line from client to node
      (q/line (:x (default-origin)) (:y (default-origin)) node-x node-y)
      ; Color and draw node
      (apply q/fill (get grays (mod index (count grays))))
;;       (q/fill 255 255 255)
      (q/ellipse node-x node-y 50 50)
      (doall (map #(draw-data-point node-x node-y %) node-list))
      (draw-circle (rest coordinates) data (inc index)))))

(defn draw-circles [radian-positions data]
  (let [coordinates (map #(vector (q/cos %) (q/sin %)) radian-positions)]
    (draw-circle coordinates data 1))
  (draw-origin))

(defn draw-state [{:keys [number-of-nodes data]}]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 240)
  (let [radian-positions (radian-positions number-of-nodes)]
    ; Move origin point to the center of the sketch.
    (q/with-translation [(/ (q/width) 2)
                         (/ (q/height) 2)]
                        (draw-circles radian-positions data))))

(defn simple-hash [value]
  (.indexOf alphabet-range value))

(defn key-press [state event]
  (let [key (:key event)
        {:keys [word number-of-nodes data]} state]
    (if (and (= key :up) (< number-of-nodes 20))
      (let [new-number-of-nodes (inc number-of-nodes)]
        (assoc state :number-of-nodes new-number-of-nodes :data (initialize-node data new-number-of-nodes)))
      (if (and (= key :down) (> number-of-nodes 1))
        (assoc state :number-of-nodes (dec number-of-nodes) :data (dissoc data (keywordize number-of-nodes)))
        (if (clojure.string/includes? alphabet-range (name key))
          (let [matching-node (-> key (name) (simple-hash) (mod number-of-nodes) (inc) (keywordize))
                updated-node (conj (matching-node data) {:key key
                                                         :name (name key)
                                                         :step 0.0
                                                         :color (-> key (name) (simple-hash) (mod (count colors)))})]
            (assoc-in state [:data matching-node] updated-node))
          state)))))

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
