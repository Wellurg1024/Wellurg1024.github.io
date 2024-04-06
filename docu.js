window.onscroll = function() {
    myFunction();
};

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progress").style.width = scrolled + "%";

    if (scrolled >= 100) {
        // 显示模态框
        document.getElementById("myModal").style.display = "block";
    }
}

// 关闭模态框
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}
