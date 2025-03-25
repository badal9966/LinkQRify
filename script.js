let imgbox = document.getElementById("imgbox");
let qrimg = document.getElementById("qrimg");
let qrtext = document.getElementById("qrtext");

document.getElementById("generate").addEventListener("click", () => {
    let text = qrtext.value.trim();

    if (text === "") {
        alert("Please enter a valid URL or text!");
        return;
    }

    let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    qrimg.src = url;
    imgbox.classList.add("show-img");
    imgbox.style.display = "block";
});

// Share QR Code (as Image)
document.getElementById("share").addEventListener("click", async () => {
    try {
        // Fetch the QR image as a Blob
        let response = await fetch(qrimg.src);
        let blob = await response.blob();  // Convert image to Blob(Binary Large Object)
        let file = new File([blob], "QRCode.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "QR Code",
                text: "Scan this QR Code"
            });
        } else {
            alert("Sharing images is not supported on this device.");
        }
    } catch (err) {
        console.error("Error sharing image:", err);
    }
});


// Download QR Code
document.getElementById("download").addEventListener("click", async () => {
    if (!qrimg.src || qrimg.src === "") {
        alert("Please generate a QR code first!");
        return;
    }

    try {
        const response = await fetch(qrimg.src, { mode: "cors" });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "QRCode.png"; // Set download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Free up memory
    } catch (err) {
        console.error("Download failed:", err);
        alert("Failed to download the QR code. Please try again.");
    }
});
