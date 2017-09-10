(ns distributed-hash-tool.get
  (:require [quil.core :as q :include-macros true]
            [quil.middleware :as m]))

(enable-console-print!)



(defn node-get [state key]
  (let [matching-node-index (matching-node-index state key)
        matching-node (-> state :data matching-node-index)
        node-contains? (node-contains? matching-node key)]
    state
    ))
