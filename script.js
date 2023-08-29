const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const gerarBtn = document.querySelector("button[type=submit]");
const m = document.getElementById("m");
const f = document.getElementById("f");

// Function: Create text
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  spinIcon();
  let mf = "";
  // input values
  const atividade = document.getElementById("atividade").value;
  const local = document.getElementById("local").value.trim();
  const data = document
    .getElementById("data")
    .value.split("-")
    .reverse()
    .join("/");
  if (m.checked) {
    mf = "ao";
  } else if (f.checked) {
    mf = "à";
  }

  // change innerHTML
  titulo.innerHTML = `${atividade.slice(
    2
  )} das áreas próximas ${mf} ${local} (${data})`;
  descricao.innerHTML = `No dia ${data} foi realizado ${atividade} das áreas internas ${mf} ${local}`;
});

// Spin the gear icon
function spinIcon() {
  gerarBtn.firstElementChild.classList.add("animate-spin");
  setTimeout(() => {
    gerarBtn.firstElementChild.classList.remove("animate-spin");
  }, 800);
}

// Radio Button Check (M or F)
function check() {
  const bg1 = "bg-background";
  const bg2 = "text-offWhite";
  if (m.checked) {
    m.nextElementSibling.firstElementChild.classList.add(bg1);
    m.nextElementSibling.firstElementChild.classList.add(bg2);
    f.nextElementSibling.firstElementChild.classList.remove(bg1);
    f.nextElementSibling.firstElementChild.classList.remove(bg2);
  } else if (f.checked) {
    m.nextElementSibling.firstElementChild.classList.remove(bg1);
    m.nextElementSibling.firstElementChild.classList.remove(bg2);
    f.nextElementSibling.firstElementChild.classList.add(bg1);
    f.nextElementSibling.firstElementChild.classList.add(bg2);
  }
}
check();

// Copy to Clipboard
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

var copyTituloBtn = document.querySelector("#titulo-btn"),
  copyDescBtn = document.querySelector("#desc-btn");

copyTituloBtn.addEventListener("click", function (event) {
  copyTextToClipboard(titulo.innerHTML);
});

copyDescBtn.addEventListener("click", function (event) {
  copyTextToClipboard(descricao.innerHTML);
});
