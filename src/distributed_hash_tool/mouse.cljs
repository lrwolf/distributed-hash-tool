(ns distributed-hash-tool.mouse
  (:require  [distributed-hash-tool.constant :refer [alphabet-range]]
             [distributed-hash-tool.operation :as operation]))

;;
;; These functions capture mouse clicks on the buttons on the left-side of the
;; tool and translate them to their corresponding operations.
;;

(defn is-between [value left right]
  (and (> value left) (< value right)))

(defn click [state event]
  (let [x (:x event)
        y (:y event)
        random-letter (get alphabet-range (rand-int 6))
        random-keyword (keyword random-letter)]
    (cond
      (and (is-between x 105 180) (is-between y 120 160)) (operation/node-get (assoc state :mode :get) random-keyword)
      (and (is-between x 60 135) (is-between y 230 270)) (operation/node-put (assoc state :mode :put) random-keyword)
      (and (is-between x 105 180) (is-between y 335 375)) (operation/node-delete (assoc state :mode :del) random-keyword)
      :else state)))
