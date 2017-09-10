(ns distributed-hash-tool.keyboard
  (:require [distributed-hash-tool.constant :refer [alphabet-range]]
            [distributed-hash-tool.operation :as operation]))

;;
;; These functions dispatch key presses to their corresponding operations.
;;

(defn press [state event]
  (let [{:keys [key key-code]} event
        {:keys [number-of-nodes data]} state
        valid-key (clojure.string/includes? alphabet-range (name key))
        inc-number-of-nodes (inc number-of-nodes)
        dec-number-of-nodes (dec number-of-nodes)]
    (cond
      (and (= key :up) (< number-of-nodes 20)) (-> state (assoc :number-of-nodes inc-number-of-nodes) (assoc-in [:data] (operation/node-rebalance data inc-number-of-nodes)))
      (and (= key :down) (> number-of-nodes 1)) (-> state (assoc :number-of-nodes dec-number-of-nodes) (assoc-in [:data] (operation/node-rebalance data dec-number-of-nodes)))
      (= key :right) (assoc state :mode :put)
      (= key :left) (assoc state :mode :get)
      (= key-code 32) (assoc state :mode :del)
      (and valid-key (= (:mode state) :put)) (operation/node-put state key)
      (and valid-key (= (:mode state) :get)) (operation/node-get state key)
      (and valid-key (= (:mode state) :del)) (operation/node-delete state key)
      :else state)))
