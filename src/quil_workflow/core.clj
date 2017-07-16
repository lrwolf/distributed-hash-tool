(ns quil-workflow.core
  (:require [quil.core :as q]
            [quil.middleware :as m]))

(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; Set color mode to HSB (HSV) instead of default RGB.
  (q/color-mode :hsb)
  ; setup function returns initial state. It contains
  ; circle color and position.
  {:color 0
   :angle 0
   :word ""
   :number-of-nodes 100})

(defn update-state [state]
  ; Update sketch state by changing circle color and position.
  (update state :color #(mod (+ % 0.7) 255)))

;  (let [{color :color} state]
;    (assoc state :color (mod (+ color 0.7) 255)
;    )
;  {
 ;   :color (mod (+ (:color state) 0.7) 255)
   ;:angle (+ (:angle state) 0.1)
  ;  :angle (:angle state)
  ; :word (:word state)})

(defn new-position [value]
  (mod (+ 270 value) 360))

(defn positions [number-of-nodes]
  (let [spacer (/ 180 (inc number-of-nodes))
        raw-positions (map inc (range number-of-nodes))
        degree-positions (map #(* % spacer) raw-positions)
        adjusted-degree-positions (map new-position degree-positions)
        radian-positions (map q/radians adjusted-degree-positions)]
    (do
      (println (str "number-of-nodes: " number-of-nodes))
      (println spacer)
      (println raw-positions)
      (println degree-positions)
      (println adjusted-degree-positions)
      (println radian-positions))
    radian-positions))

(defn draw-circles [radian-positions]
  (let [coordinates (map #(vector (* 150 (q/cos %)) (* 150 (q/sin %))) radian-positions)
        [x y] (first coordinates)
        [x2 y2] (second coordinates)]

    (print "coordinates:" )
    (println coordinates)
    (println x)
    (println y)
;(q/ellipse x y 25 25)
;(q/ellipse x2 y2 25 25)

    (draw-circle coordinates)

    ;  (map #(q/ellipse %1 %2 100 100) coordinates)
    ))


(defn draw-circle [coordinates]
  (if (not (empty? coordinates))
    (let [[x y] (first coordinates)
        other-coordinates (rest coordinates)]
      (q/ellipse x y 25 25)
      (draw-circle other-coordinates))))

(defn draw-state [state]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 240)
  ; Set circle color.
  (q/fill (:color state) 255 255)
  ; Calculate x and y coordinates of the circle.
  (let [radian-positions (positions (:number-of-nodes state))
        angle (q/radians (:angle state))
        x1 (* 150 (q/cos angle))
        y1 (* 150 (q/sin angle))]
    ; Move origin point to the center of the sketch.
    (q/with-translation [(/ (q/width) 2)
                         (/ (q/height) 2)]
      ; Draw the circle.
;      (q/ellipse x1 y1 100 100)
                        (draw-circles radian-positions)
                        )))

(defn key-press [old-state event]
  (let [key (:key event)
        word (:word old-state)
        new-state (assoc old-state :word (str word (name key)))
        ]
  ;(let [raw-key (raw-key)
  ;  the-key-code (key-code)
  ;  the-key-pressed (if (= processing.core.PConstants/CODED (int raw-key)) the-key-code raw-key)
  ;  move (moves (get valid-keys the-key-pressed :still))]
;    (swap! blob-location (partial change-location move))
;    (swap! blob-location (partial normalise (params :screen-bounds)))
;    (redraw)
    (do
      (println (str "old-state: " old-state))
      (println (str "event: " event))
      (println (str "new-state: " new-state)))
    new-state
    ))

(q/defsketch quil-workflow
  :title "You spin my circle right round"
  :size [500 500]
  ; setup function called only once, during sketch initialization.
  :setup setup
  ; update-state is called on each iteration before draw-state.
  :update update-state
  :draw draw-state
  :features [:keep-on-top]
  :key-pressed key-press
  ; This sketch uses functional-mode middleware.
  ; Check quil wiki for more info about middlewares and particularly
  ; fun-mode.
  :middleware [m/fun-mode])
