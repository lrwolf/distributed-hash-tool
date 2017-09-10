(ns distributed-hash-tool.operation
  (:require [distributed-hash-tool.constant :refer [alphabet-range colors keywordize]]))

(defn simple-hash [key]
  (let [key-as-string (name key)]
    (.indexOf alphabet-range key-as-string)))

; This function returns a node for the key. This is either the node where the data
; should go or the node where the data already resides.
(defn matching-node-index [state key]
  (let [number-of-nodes (:number-of-nodes state)]
    (-> key (simple-hash) (mod number-of-nodes) (inc) (keywordize))))

; This map represents a key. It contains the key, the color of the circle that
; represents that data, and the animation step.
(defn key-animation-map [key step]
  {:key key
   :name (name key)
   :step step
   :color (-> key (simple-hash) (mod (count colors)))})

(defn node-put [state key]
  (let [matching-node-index (matching-node-index state key)
        possible-put-animation-list (-> state :put-animation-map matching-node-index)
        ; Use the list if it present, or create a new one if it doesn't exist.
        put-animation-list (if (nil? possible-put-animation-list) (list) possible-put-animation-list)
        ; Add the new key to the put-animation-list so it will show up in the tool.
        updated-put-animation-list (conj put-animation-list (key-animation-map key 0.0))
        possible-data-set (-> state :data matching-node-index)
        data-set (if (nil? possible-data-set) #{} possible-data-set)
        ; Add the key to the data set (for checks concerning whether a key exists, e.g. put/delete).
        updated-data-set (conj data-set key)]
    (-> state
        (assoc-in [:put-animation-map matching-node-index] updated-put-animation-list)
        (assoc-in [:data matching-node-index] updated-data-set)
        (assoc :last-key key)
        (assoc :success? true))))

(defn node-get [state key]
  (let [matching-node-index (matching-node-index state key)
        data-set (-> state :data matching-node-index)
        success? (contains? data-set key)]
    ; Only attempt a get if the key is in the distributed hash.
    (-> (if success?
          (let [possible-get-animation-list (-> state :get-animation-map matching-node-index)
                get-animation-list (if (nil? possible-get-animation-list) (list) possible-get-animation-list)
                ; Add the new key to the get-animation-list so it will show up in the tool.
                updated-get-animation-list (conj get-animation-list (key-animation-map key 100.0))]
            (assoc-in state [:get-animation-map matching-node-index] updated-get-animation-list))
          state)
        (assoc :last-key key)
        (assoc :success? success?))))

(defn node-delete [state key]
  (let [matching-node-index (matching-node-index state key)
        possible-data-set (-> state :data matching-node-index)
        data-set (if (nil? possible-data-set) #{} possible-data-set)
        success? (contains? data-set key)
        updated-data-set (disj data-set key)]
    (-> state
        (assoc-in [:data matching-node-index] updated-data-set)
        (assoc :last-key key)
        (assoc :success? success?))))

(defn rebalance-data [all-data-set new-number-of-nodes]
  (reduce #(let [matching-node-index (-> %2 (simple-hash) (mod new-number-of-nodes) (inc) (keywordize))
                 possible-matching-data-set (matching-node-index %1)
                 matching-data-set (if (nil? possible-matching-data-set) #{} possible-matching-data-set)]
             (assoc %1 matching-node-index (conj matching-data-set %2))) {} all-data-set))

; This function collapses all the data in the distributed hash into a single set. It then
; redistributes those keys among the new number of nodes.
(defn node-rebalance [data new-number-of-nodes]
  (let [data-vals (vals data)
        all-data-set (reduce #(into #{} (concat %1 %2)) #{} data-vals)
        rebalance-all-data (rebalance-data all-data-set new-number-of-nodes)]
    rebalance-all-data))
