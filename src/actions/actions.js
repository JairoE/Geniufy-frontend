export let searchHandler = (searchForm) => {
  return({
    type: "SEARCH_SONG",
    payload:{
      form: searchForm
    }
  })
}

export let highlightHandler = (selectedObject) => {
  return({
    type: "HIGHLIGHT_TO_ANNOTATE",
    payload:{
      highlight: selectedObject
    }
  })
}
