
let imgbox = document.getElementById("imgbox");
let qrimg = document.getElementById("qrimg");
let qrtext = document.getElementById("qrtext"); // Get the input field reference, not its value yet

document.querySelector(".btn")
    .addEventListener("click", () => {
        let text = qrtext.value.trim(); // Get the current value of input

        if (text === "") {
            alert("Please enter a valid URL or text!");
            return;
        }

        let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
        qrimg.src = url;
        imgbox.classList.add("show-img");
        imgbox.style.display = "block";

    });
