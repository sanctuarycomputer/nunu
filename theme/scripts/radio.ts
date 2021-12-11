export default (function() {
  const Radio = {
    async init() {
      const response =
        await window.fetch('https://public.radio.co/stations/s8a3652f0b/status')
      const data = await response.json();
      if (data.status === "online") Radio.enablePlayer();
    },

    async enablePlayer() {
      const radio = document.getElementById("Radio");
      $('.Radio').radiocoPlayer();
      const child = document.createElement('div');
      child.innerHTML =
        '<span class="CollectionLinks__button live"><i class="live-icon"></i>&nbsp; Live</span>';
      radio.appendChild(child.firstChild);
      radio.classList.add("enabled");
    }
  };

  Radio.init();
})();

