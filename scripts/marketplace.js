const saf_button = document.getElementById("search_and_filter_btn");
const saf_body = document.getElementById("search_and_filter_body");
const saf_close_btn = document.getElementById("close_btn");

saf_button.addEventListener("click", () => {
	saf_body.classList.toggle("hidden");
});

saf_close_btn.addEventListener("click", () => {
	saf_body.classList.add("hidden");
});
