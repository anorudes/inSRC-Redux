export let Config = {
  data: {},
  load() {
    return fetch('/config.json')
      .then(res =>
        res.json().then(data => this.data = data)
    );
  }
}
