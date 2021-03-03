export default(function() {
  const Activatable = {
    SELECTORS: {
      activatable: "[data-activatable]",
      /* Trigger that can activate and deactivate an activatable */
      toggle: "[data-activatable-toggle]",
      /* Trigger that can only activate an activatable */
      activateTrigger: "[data-activatable-activate-trigger]",
      /* Trigger that can only deactivate an activatable */
      deactivateTrigger: "[data-activatable-deactivate-trigger]",
    },
    ATTRIBUTES:{
      active: "data-active",
    },

    init() {
      const activatables = [].slice.call(
        document.querySelectorAll(Activatable.SELECTORS.activatable)
      );

      Activatable.bindEventListeners(activatables);
    },

    bindEventListeners(activatables: Element[]) {
      activatables.forEach((activatable) => {
        const toggle = activatable.querySelector(Activatable.SELECTORS.toggle);
        const activateTrigger =  activatable.querySelector(Activatable.SELECTORS.activateTrigger);
        const deactivateTrigger =  activatable.querySelector(Activatable.SELECTORS.deactivateTrigger);

        if (toggle) {
          toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            Activatable.toggle(activatable);
          });
        }

        if (activateTrigger) {
          activateTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            Activatable.activate(activatable);
          });
        }

        if (deactivateTrigger) {
          deactivateTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            Activatable.deactivate(activatable);
          });
        }
      });
    },

    isActive(activatable: Element) {
      return activatable.hasAttribute(Activatable.ATTRIBUTES.active);
    },

    toggle(activatable: Element) {
      if (Activatable.isActive(activatable)) {
        Activatable.deactivate(activatable);
      } else {
        Activatable.activate(activatable);
      }
    },

    deactivate(activatable: Element) {
      activatable.removeAttribute(Activatable.ATTRIBUTES.active);
    },

    activate(activatable: Element) {
      activatable.setAttribute(Activatable.ATTRIBUTES.active, "true");
    },
  };

  Activatable.init();
  return Activatable;
})();
