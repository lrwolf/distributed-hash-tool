(ns distributed-hash-tool.core
  (:require [quil.core :as q :include-macros true]
            [quil.middleware :as m]
            [distributed-hash-tool.constant :refer [radius]]
            [distributed-hash-tool.origin :as origin]
            [distributed-hash-tool.mouse :as mouse]
            [distributed-hash-tool.keyboard :as keyboard]
            [distributed-hash-tool.point :as point]
            [distributed-hash-tool.button :as button]))

(enable-console-print!)

(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; Setup function returns initial state.
  (let [number-of-nodes 3]
    {:number-of-nodes 3
     :mode :put
     :data {}
     :put-animation-map {}
     :get-animation-map {}}))

; Increase the animation step.
(defn increase-one-step [step]
  (if (< step radius)
    (inc step)
    step))

; Decreate the animation step.
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

; These two methods filter the animation steps such that the animation step is only applied
; if the position passes a predicate, e.g. only increase the step if its not beyond a certain
; position.
(defn filter-step [step-predicate animation-list]
  (filter #(step-predicate (:step %)) animation-list))

(defn filter-animation-map [animation-map step-predicate]
  (let [map-keys (keys animation-map)
        map-vals (vals animation-map)
        filtered-vals (map #(filter-step step-predicate %) map-vals)
        filtered-animation-map (zipmap map-keys filtered-vals)]
    filtered-animation-map))

(defn update-state [state]
  (let [filtered-put-animation-map (filter-animation-map (:put-animation-map state) #(<= % 125.0))
        ; In the case of a PUT, increasing the animation step moves the data point from the client
        ; to the node.
        updated-put-animation-map (update-animation-map filtered-put-animation-map increase-one-step)
        filtered-get-animation-map (filter-animation-map (:get-animation-map state) #(> % 0.0))
        ; In the case of a GET, decreasing the animation step moves the data point from the node
        ; to the client.
        updated-get-animation-map (update-animation-map filtered-get-animation-map decrease-one-step)]
    (assoc state :put-animation-map updated-put-animation-map :get-animation-map updated-get-animation-map)))

(defn radian-positions [number-of-nodes]
  (let [spacer (/ 180 (inc number-of-nodes))
        ; Space the nodes out evenly along a semi-circle
        degree-positions (map #(* % spacer) (range 1 (inc number-of-nodes)))
        ; Translate those nodes to appear on the right-half of the screen
        translated-degree-positions (map #(mod (+ 270 %) 360) degree-positions)]
    (map q/radians translated-degree-positions)))

; This is a helper method that creates text.
(defn draw-text [value x y]
  (q/fill 0 0 0)
  (q/text-align :left :center)
  (q/text-size 16)
  (q/text value x y))

; This function draws the title at the top of the tool.
(defn draw-title []
  (q/fill 0 0 0)
  (q/text-align :center :center)
  (q/text-size 16)
  (q/text "Distributed Hash Tool" 0 (* -1 (+ radius 30))))

(defn draw-state [{:keys [number-of-nodes put-animation-map get-animation-map mode last-key success?] :or {last-key "", success? ""}}]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 255)
  (let [radian-positions (radian-positions number-of-nodes)]
    ; Move origin point to the center of the sketch.
    (draw-text (str "Mode: " (clojure.string/upper-case (name mode))) 380 420)
    (draw-text (str "Key: \"" (name last-key) "\"") 380 440)
    (draw-text (str "Success: " success?) 380 460)
    (q/with-translation [(/ (q/width) 2)
                         (/ (q/height) 2)]
                        (q/text-size 12)
                        (point/draw-all radian-positions put-animation-map get-animation-map)
                        (origin/draw)
                        (button/draw-all)
                        (draw-title))))

(q/defsketch distributed-hash-tool
  :host "distributed-hash-tool"
  :size [500 500]
  ; setup function called only once, during sketch initialization.
  :setup setup
  ; update-state is called on each iteration before draw-state.
  :update update-state
  :draw draw-state
  :key-pressed keyboard/press
  ; This sketch uses functional-mode middleware.
  ; Check quil wiki for more info about middlewares and particularly
  ; fun-mode.
  :mouse-clicked mouse/click
  :middleware [m/fun-mode])
