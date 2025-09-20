const GAS_URL = "https://script.google.com/macros/s/AKfycbxdmwsV_10zaFbPX1TWAf6e7BJAx0-R9H7IgAV0AkZB30uu3CDJYUypJNKgAGJjGnCHsQ/exec";

const sumiContainer = document.getElementById("sumi");

function updateSumi() {
  fetch(GAS_URL + "?t=" + Date.now(), { cache: "no-store" }) // キャッシュ回避
    .then(response => {
      if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const checks = data.checks;
      sumiContainer.innerHTML = ""; 

      checks.forEach((checked, index) => {
        if (checked) {
          const div = document.createElement("div");
          div.classList.add("sumi-icon", `sumi-${index}`);
          sumiContainer.appendChild(div);
        }
      });
    })
    .catch(error => {
      console.error("データ取得に失敗しました:", error);
    });
}


setInterval(updateSumi, 2000);
updateSumi();
