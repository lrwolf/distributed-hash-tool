(ns quil-workflow.core
  (:require [quil.core :as q]
            [quil.middleware :as m]
            [quil-workflow.dynamic :as dynamic]))

(q/defsketch quil-workflow
             :title "Distributed Hash Table"
             :size [500 500]
             ; setup function called only once, during sketch initialization.
             :setup dynamic/setup
             ; update-state is called on each iteration before draw-state.
             :update dynamic/update-state
             :draw dynamic/draw-state
             :features [:keep-on-top]
             :key-pressed dynamic/key-press
             ; This sketch uses functional-mode middleware.
             ; Check quil wiki for more info about middlewares and particularly
             ; fun-mode.
             :middleware [m/fun-mode])
