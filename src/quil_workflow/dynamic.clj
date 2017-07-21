(ns quil-workflow.dynamic
  (:require [quil.core :as q])
  (:import (java.lang Math)))

(def radius 150)

(def origin (let [angle (q/radians 180)]
              {:angle angle
               :x     (* radius (q/cos angle))
               :y     (* radius (q/sin angle))}))

(defn draw-origin []
  ; Set the circle color and draw the client.
  (q/fill 200 100 100)
  ;(q/ellipse 0 0 50 50)
  ;(q/ellipse 0 0 30 30)
  (q/ellipse (:x origin) (:y origin) 100 100)
  ;(q/ellipse (+ (:x origin) 50) (:y origin) 100 100)
  (q/fill 10 100 100)
  (q/text "origin" (:x origin) (:y origin)))


(defn start-animation [state]
  (assoc state :dhm {:1 {:value "a"
                         :step  0.0}}))


(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; setup function returns initial state. It contains
  ; circle color and position.
  {:color           0
   :angle           0
   :word            ""
   :number-of-nodes 3})

(defn update-state [state]
  (if (contains? state :dhm)
    (let [dhm (:dhm state)
          one (:1 dhm)
          step (:step one)]
      (if (> step 1000.0)
        (assoc-in state [:dhm :1 :step] 1000.0)
        (assoc-in state [:dhm :1 :step] (+ step 1))))
    state))

(defn radian-positions [number-of-nodes]
  (let [spacer (/ 180 (inc number-of-nodes))
        raw-positions (map inc (range number-of-nodes))
        ; Space the nodes out evenly along a semi-circle
        degree-positions (map #(* % spacer) raw-positions)
        ; Translate those nodes to appear on the right-half of the screen
        translated-degree-positions (map #(mod (+ 270 %) 360) degree-positions)]
    (map q/radians translated-degree-positions)))

(defn slope [x1 y1 x2 y2]
  (let [delta-y (- y2 y1)
        delta-x (- x2 x1)]
    (println (str "delta-y=" delta-y))
    (println (str "delta-x=" delta-x))
    (/ delta-y delta-x)))

(defn distance [x1 y1 x2 y2]
  (let [delta-y (- y2 y1)
        delta-y-squrared (Math/pow delta-y 2)
        delta-x (- x2 x1)
        delta-x-squared (Math/pow delta-x 2)]
    (Math/sqrt (+ delta-y-squrared delta-x-squared))))

(defn draw-circle [coordinates dhm index]
  (if (not (empty? coordinates))
    (let [[x y] (first coordinates)
          node-x (* radius x)
          node-y (* radius y)
          other-coordinates (rest coordinates)
          real-index (-> index (str) (keyword))]
      (q/line (:x origin) (:y origin) node-x node-y)
      (q/fill 255 255 255)
      (q/ellipse node-x node-y 50 50)
      (if (contains? dhm real-index)
        (let [m (real-index dhm)]
          (if (not (nil? m))
            (let [slope (slope (:x origin) (:y origin) node-x node-y)
                  y-intercept (- (:y origin) (* slope (:x origin)))
                  distance (distance (:x origin) (:y origin) node-x node-y)
                  next-x (+ (:x origin) (:step m))
                  next-y (+ (* slope next-x) y-intercept)]
              (println (str "origin-x=" (:x origin)))
              (println (str "origin-y=" (:y origin)))
              (println (str "node-x=" node-x))
              (println (str "node-y=" node-y))
              (println (str "y-intercept=" y-intercept))
              (println (str "origin-x=" (:x origin)))
              (println (str "origin-y=" (:y origin)))
              (println (str "distance=" distance))
              (println (str "slope=" slope "\tnext-x=" next-x "\tnext-y=" next-y))
              ;(q/ellipse (* (:step m) node-x) (* (:step m) node-y) 25 25)
              (if (< next-x node-x)
                (q/ellipse next-x next-y 25 25))

              )
            )))
      (draw-circle other-coordinates dhm (inc index)))))

(defn draw-circles [radian-positions dhm]
  (let [coordinates (map #(vector (q/cos %) (q/sin %)) radian-positions)]
    (draw-circle coordinates dhm 1))
  (draw-origin))

(defn draw-state [{:keys [number-of-nodes dhm],
                   :or   {number-of-nodes 3
                          dhm             {}}}]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 240)
  (let [radian-positions (radian-positions number-of-nodes)]
    ; Move origin point to the center of the sketch.
    (q/with-translation [(/ (q/width) 2)
                         (/ (q/height) 2)]
                        (draw-circles radian-positions dhm))))

(defn key-press [state event]
  (let [key (:key event)
        word (:word state)
        number-of-nodes (:number-of-nodes state)
        new-state (assoc state :word (str word (name key)))]
    (println (str "key=" key))
    (if (and (= key :up) (< number-of-nodes 20))
      (assoc new-state :number-of-nodes (inc number-of-nodes))
      (if (and (= key :down) (> number-of-nodes 1))
        (assoc new-state :number-of-nodes (dec number-of-nodes))
        (if (= key :a)
          (start-animation state)
          new-state)))))
