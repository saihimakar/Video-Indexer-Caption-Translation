function fetchForLanguages(languages) {
let params = new URLSearchParams(top.location.search.substring(1));
  let videoId = params.get("id"); // Video ID
  console.log( 'videoId=' + videoId )

console.info('starting fetch for', languages)
  return fetch("https://prod-00.westus2.logic.azure.com:443/workflows/366b73ac2f354e2799b87db3c0241adc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FdEthGEqPF7UUYf4pB69Q--ZxnZRKngXhFZnVjPxyc4", { // this is my azure  provided endpoint instead
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      languages: languages,
      videoId: videoId
    })
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    return response.json()
  })
}


function handleSubmit(event) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const languages = data.getAll('language')
  console.info('languages selected:', languages)
  fetchForLanguages(languages)
    .then((result) => console.log('got result:', result))
}

let form = document.getElementById('language-form')
form.addEventListener('submit', handleSubmit)
