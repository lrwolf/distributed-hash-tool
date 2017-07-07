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
   :word ""})

(defn update-state [state]
  ; Update sketch state by changing circle color and position.
  {:color (mod (+ (:color state) 0.7) 255)
   :angle (+ (:angle state) 0.1)
   :word (:word state)})

(defn draw-state [state]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 240)
  ; Set circle color.
  (q/fill (:color state) 255 255)
  ; Calculate x and y coordinates of the circle.
  (let [angle (:angle state)
        x1 (* 150 (q/cos angle))
        y1 (* 150 (q/sin angle))]
    ; Move origin point to the center of the sketch.
    (q/with-translation [(/ (q/width) 2)
                         (/ (q/height) 2)]
      ; Draw the circle.
      (q/ellipse x1 y1 100 100))))

(defn key-press [old-state event]
  (let [key (:key event)
        word (:word old-state)
        new-state (assoc old-state :word (str word (name key)))]
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
