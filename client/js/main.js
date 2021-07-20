$("#upload_button").click(function() {
	$("#fileinput").trigger('click');
});


$("#fileinput").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		imEl = document.getElementById("display_image");
		imEl.onload = function () {
			//predict();
		}
		$("#display_image").attr("src", dataURL);
		$("#result_info").empty();
	}
	let file = $("#fileinput").prop("files")[0];
	reader.readAsDataURL(file);
});