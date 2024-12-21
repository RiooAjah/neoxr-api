let express = require('express'), router = express.Router(), yt = require('../lib/search')
const gptt355turbo = {
  send: async (message, model = "gpt-3.5-turbo") => {
    try {
      const validModels = ["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "gpt-4o-mini", "gpt-4o"];
      if (!validModels.includes(model)) {
        throw new Error(`Model tidak valid! Pilih salah satu: ${validModels.join(', ')}`);
      }

      const payload = {
        messages: [{ role: "user", content: message }],
        model: model
      };

      const response = await axios.post("https://mpzxsmlptc4kfw5qw2h6nat6iu0hvxiw.lambda-url.us-east-2.on.aws/process", payload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Postify/1.0.0'
        }
      });

      // Ekstrak hanya konten teks dari respons API
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim pesan:", error.message);
      throw new Error('Tidak dapat memproses permintaan chatbot.');
    }
  }
};
router.get('/api/ai/gptturbo', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: global.status.query || "Query parameter is missing." });
    }

    const response = await gptt355turbo.send(query);

    res.status(200).json({
      status: 200,
      creator: "RiooXdzz",
      data: { response },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get('/video', async (req, res) => {
	let q = req.query.q
	let apikey = req.query.apikey
	if(!q) return res.json(global.status.query)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.video(q)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/yta', async (req, res) => {
	let url = req.query.url
	let apikey = req.query.apikey
	if (!url) return res.json(global.status.url)
	if (!url.match('youtu.be') && !url.match('youtube.com')) return res.json(global.status.invalidURL)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.ytmp3(url)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/ytv', async (req, res) => {
	let url = req.query.url
	let apikey = req.query.apikey
	if (!url) return res.json(global.status.url)
	if (!url.match('youtu.be') && !url.match('youtube.com')) return res.json(global.status.invalidURL)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.ytmp4(url)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/yts', async (req, res) => {
	let q = req.query.q
	let apikey = req.query.apikey
	if(!q) return res.json(handle.query)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.search(q)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

module.exports = router