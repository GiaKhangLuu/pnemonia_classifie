$('document').ready(async () => {
	console.log('Loading model ...')
	const model = await tf.loadLayersModel("http://localhost:3000/models/vgg16_model/model.json")
	console.log('Done')
	console.log(model.summary())
})