(ns distributed-hash-tool.button
  (:require [quil.core :as q :include-macros true]
            [distributed-hash-tool.constant :refer [radius]]))

;;
;; These functions draw the buttons on the left side of the tool.
;;

(def button-labels ["DEL" "PUT" "GET"])

(defn button-positions [number-of-nodes]
  (let [spacer (/ 180 (inc number-of-nodes))
        ; Space the nodes out evenly along a semi-circle
        degree-positions (map #(* % spacer) (range 1 (inc number-of-nodes)))
        ; Translate those nodes to appear on the right-half of the screen
        translated-degree-positions (map #(mod (+ 90 %) 360) degree-positions)]
    (map q/radians translated-degree-positions)))

(defn draw [coordinates button-labels]
  (if (not (empty? coordinates))
    (let [[x y] (first coordinates)
          node-x (* radius x)
          node-y (* radius y)]
      ; Color and draw node
      (apply q/fill [194 194 239])
      (q/ellipse node-x node-y 75 40)
      (q/fill 0 0 0)
      (q/text-align :center :center)
      ; Add the index label to the node
      (q/text (first button-labels) node-x node-y)
      (draw (rest coordinates) (rest button-labels)))))

(defn draw-all []
  (let [coordinates (map #(vector (q/cos %) (q/sin %)) (button-positions 3))]
    (draw coordinates button-labels)))
