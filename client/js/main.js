let model
const THRESHOLD = 0.7134 * 100

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
	//const conclusion_container = document.getElementById('predict_info')
	console.log(prediction[0])
	let prob = (prediction[0] * 100).toFixed(2)
	let predict = ''
	if(prob > THRESHOLD){
		predict = 'Bệnh nhân bị viêm phổi'
		prob = prob
	} else {
		predict = 'Bệnh nhân không bị viêm phổi' 
		prob = 100 - prob
	}
	const conclusion = 'Chẩn đoán: ' + predict
	const result = 'Tỷ lệ : ' + prob + '%'
	result_container.innerText = conclusion + '\n' +result
	//conclusion_container.innerText = result	
}
