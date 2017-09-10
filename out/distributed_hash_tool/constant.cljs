(ns distributed-hash-tool.constant)

(def alphabet-range "abcdefghijklmnopqrstuvwxyz")

; These are the colors used for the different keys.
(def colors [[237 106 90]
             [155 193 188]
             [54  201 198]
             [21  113  69]
             [240 235 216]])

; These are the colors used for the nodes.
(def grays [[128 128 128]
            [169 169 169]
            [211 211 211]
            [245 245 245]])

(def radius 150)

; This is a helper function used by several other functions to
; convert an index to a Clojure keyword.
(defn keywordize [index]
  (-> index (str) (keyword)))
