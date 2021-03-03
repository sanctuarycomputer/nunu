
export default (function() {
  const Activatable = {
    SELECTORS: {
      toggle: "[data-activatable-toggle]",
      toggleableItem: "[data-activatable-toggleable-item]",
      activator: "[data-activatable-activator]",
      deactivator: "[data-activatable-deactivator]",
      deactivatorAttr: "data-activatable-deactivator",
    },
    ATTRIBUTES: {
      toggle: "data-activatable-toggle",
      toggleableItem: "data-activatable-toggleable-item",
      active: "data-active",
      activator: "data-activatable-activator",
      deactivator: "data-activatable-deactivator",
    },

    init() {
      const toggles = [].slice.call(
        document.querySelectorAll(Activatable.SELECTORS.toggle)
      );
      const toggleableItems = [].slice.call(
        document.querySelectorAll(Activatable.SELECTORS.toggleableItem)
      );
      const activators = [].slice.call(
        document.querySelectorAll(Activatable.SELECTORS.activator)
      );
      const deactivators = [].slice.call(
        document.querySelectorAll(Activatable.SELECTORS.deactivator)
      );

      Activatable.bindEventListeners(
        toggles,
        toggleableItems,
        activators,
        deactivators,
      );
    },

    bindEventListeners(
      toggles: Element[],
      toggleableItems: Element[],
      activators: Element[],
      deactivators: Element[],
    ) {
      toggles.forEach((toggle) => {
        const toggleId = toggle.getAttribute(
          Activatable.ATTRIBUTES.toggle
        );

        const currentToggleableItems = toggleableItems.filter(
          (toggleableItem) =>
            toggleableItem.getAttribute(
              Activatable.ATTRIBUTES.toggleableItem
            ) === toggleId
        );

        if (!toggleId && !currentToggleableItems.length) return;

        toggle.addEventListener("click", () => {
          if (Activatable.isActive(currentToggleableItems[0])) {
            Activatable.deactivate(currentToggleableItems);
          } else {
            Activatable.activate(
              toggleableItems,
              currentToggleableItems
            );
          }
        });
      });

      activators.forEach((activator) => {
        const activatorId = activator.getAttribute(
          Activatable.ATTRIBUTES.activator
        );
        const currentActivatorItems = toggleableItems.filter(
          (toggleableItem) =>
            toggleableItem.getAttribute(
              Activatable.ATTRIBUTES.toggleableItem
            ) === activatorId
        );

        if (!activatorId && !currentActivatorItems.length) return;

        activator.addEventListener("click", () => {
          Activatable.activate(toggleableItems, currentActivatorItems);
        });
      });

      deactivators.forEach((deactivator) => {
        const activatorIdsAttr = deactivator.getAttribute(
          Activatable.SELECTORS.deactivatorAttr
        );

        if (!activatorIdsAttr) return;

        const activatorIds = activatorIdsAttr.split(",");

        const currentActivatorItems = toggleableItems.filter((toggleableItem) =>
          activatorIds.includes(
            toggleableItem.getAttribute(
              Activatable.ATTRIBUTES.toggleableItem
            )
          )
        );

        if (!currentActivatorItems.length) return;

        deactivator.addEventListener("click", () => {
          Activatable.deactivate(currentActivatorItems);
        });
      });
    },

    isActive(currentToggleableItem: Element) {
      return currentToggleableItem.hasAttribute(
        Activatable.ATTRIBUTES.active
      );
    },

    deactivate(currentToggleableItems: Element[]) {
      currentToggleableItems.forEach((toggleableItem) => {
        toggleableItem.removeAttribute(Activatable.ATTRIBUTES.active);
      });
    },

    activate(toggleableItems: Element[], currentToggleableItems: Element[]) {
      toggleableItems.forEach((toggleableItem) => {
        toggleableItem.removeAttribute(Activatable.ATTRIBUTES.active);
      });

      currentToggleableItems.forEach((toggleableItem) => {
        toggleableItem.setAttribute(
          Activatable.ATTRIBUTES.active,
          "true"
        );
      });
    },
  };

  Activatable.init();
  return Activatable;
})();