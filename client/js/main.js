let model

// Load model
$('document').ready(async () => {
	console.log('Loading model ...')
	model = await tf.loadLayersModel("http://localhost:3000/models/vgg16_model/model.json")
	console.log('Done')
})

$("#upload_button").click(function() {
	$("#fileinput").trigger('click');
});

// Trigger when user clicks choose file btn
$("#fileinput").change(async function () {
	let reader = new FileReader();
	reader.onload = async function () {
		let dataURL = reader.result;
		imEl = document.getElementById("display_image");
		imEl.onload = async function () {
			await predict(imEl);
		}
		$("#display_image").attr("src", dataURL);
		$("#result_info").empty();
	}
	let file = $("#fileinput").prop("files")[0];
	reader.readAsDataURL(file);
});

const predict = async img => {
	const img_tensor = preprocess_img(img)
	const prediction = await model.predict(img_tensor).data()
	show_prediction(prediction)
}

const preprocess_img = img => {
	// Convert img to tensor
	img = tf.browser.fromPixels(img)
	// Resize img
	img = tf.image.resizeNearestNeighbor(img, [224, 224])
	// Normalize img 
	img = img.div(255.)
	// Expand dims
	img = img.expandDims()
	//img.print()
	return img
}

const show_prediction = prediction => {
	const result_container = document.getElementById('result_info')
	console.log(prediction[0])
	const prob = (prediction[0] * 100).toFixed(4)
	const result = 'Khả năng bệnh nhân mắc bệnh viêm phổi: ' + prob + '%'
	result_container.innerText = result
}
