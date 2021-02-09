export default {
  theme: {
    light: {
      // changing the look of the component colors
      primary: '#E20074',
      // primary: '#006D5C',
      secondary: '#424242',
      // changing the accent look of all colors like sidebar
      accent: '#fff0f7',
      // accent: '#e3fffb',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',
      // changing the overall look of the copared bar
      coporate: '#E20074'
      // coporate: '#ffffff'
    }
  },
  logo: {
    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MyIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDczIDM2IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+PHRpdGxlPkRldXRzY2hlIFRlbGVrb20gQUcgQnJhbmQgTG9nbzwvdGl0bGU+PGRlc2M+VGhlIEJyYW5kIExvZ28gb2YgdGhlIERldXRzY2hlIFRlbGVrb20gQUc8L2Rlc2M+PHN0eWxlPjwhW0NEQVRBWw0KCS5zdDB7ZmlsbDojRkZGRkZGO30NCl1dPjwvc3R5bGU+PGcgaWQ9IkxvZ29fRGFyayI+PHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMjR2LTdoN3Y3SDB6TTIyIDI0di03aDd2N2gtN3pNNDQgMjR2LTdoN3Y3aC03ek02NiAyNHYtN2g3djdoLTd6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTEyIDEuNzRjLTIuOTQuMDktNS41NiAxLjA5LTcuMjIgMi45OC0xLjU3IDEuOC0yLjU1IDQuNi0yLjkxIDguMzJMMCAxMi43MS4zNiAwaDI4LjI5TDI5IDEyLjcxbC0xLjg3LjMzYy0uMzYtMy43Ni0xLjM0LTYuNTItMi45MS04LjMyLTEuNjYtMS44OS00LjI4LTIuODktNy4yMi0yLjk4VjI4LjNjMCAyLjMxLjU3IDMuODIgMS4yNSA0LjUxLjU2LjYgMS40MS45NiAyLjc1IDEuMDguNDIuMDMgMS4wNS4wNiAyIC4wNlYzNkg2di0yLjA0Yy45NSAwIDEuNTgtLjAzIDItLjA2IDEuMzQtLjEyIDIuMTgtLjQ4IDIuNzUtMS4wOC42OC0uNjkgMS4yNS0yLjE5IDEuMjUtNC41MVYxLjc0eiIvPjwvZz48L3N2Zz4=',
    slogan: 'Erleben, was verbindet.'
    // url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIyMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ2MS41MjcgMTA1LjcxOWMwIDM4LjY2My0yMy41ODkgNTYuOTQxLTUzLjExNCA1Ni45NDFoLTE4LjA0NHYtMjMuMTk5aDE2LjYzOGMxNy44MDkgMCAyOS42OC05LjYwNiAyOS42OC0zMy43NDIgMC0yMy45MDItMTEuMjI3LTM1Ljg1NS0zMC4yMDgtMzUuODU1LTE4LjI3OCAwLTMxLjM0MiAxMS4yNS0zMS4zNDIgMzUuMzg2djk3LjAxNGgtMjQuNjA1VjQ5LjcxMWgyNC42MDV2MTMuMTI1aDMuNTE1YzguMjAyLTExLjAxNCAyMC4zMjgtMTUuOTM3IDMyLjk4Mi0xNS45MzcgMjcuMTgzIDAgNDkuODkzIDE5LjY4NCA0OS44OTMgNTguODJ6TTI5OS44MiA5NS42NDFMMjgzLjQxNiA5NGMtMTIuODg4LTEuMTcyLTE5LjY4NC00LjY4Ny0xOS42ODQtMTIuMTg2IDAtOC45MDUgOC42NzEtMTQuMDYgMjEuMDktMTQuMDYgMTIuODg5IDAgMjEuMDkgNi4wOTMgMjEuNzkzIDE0Ljc2M2gyMy42NjhjLS45MzctMjIuMDI3LTE4LjA0My0zNS42MTktNDUuMjI2LTM1LjYxOS0yNy40MTcgMC00NS45MyAxNC41My00NS45MyAzNS44NTMgMCAxNy44MSAxMS4yNDggMjkuMjkyIDM2Ljc5MSAzMS44N2wxNi42MzcgMS42NGMxMC4wNzcuOTM3IDE2Ljg3MyAzLjA0NiAxNi44NzMgMTIuNjU0IDAgOC42NzEtNi4zMjggMTQuOTk3LTIyLjk2NSAxNC45OTctMTUuMzIxIDAtMjIuODctNi45NTItMjUuNTE5LTE2LjI3MWgtMjUuNjA1YzIuNTUxIDIxLjMwMiAyMC40NDYgMzcuODMgNTEuMTI0IDM3LjgzIDI4LjgyMyAwIDQ3LjU2OS0xNS4yMzIgNDcuNTY5LTM3LjcyNyAwLTE5LjkxOS0xMy4xMjItMjkuOTk1LTM0LjIxMi0zMi4xMDR6bTI1Ny4wMDIgMzIuMDAxYy0zLjg2IDguODY1LTEzLjA4MyAxNS41NjktMjYuMTcxIDE1LjU2OS0xOC4wNDMgMC0zMS40LTExLjcxNy0zMS40LTM3LjAyNSAwLTI0LjEzNyAxMi40MTktMzcuNDk0IDMxLjYzNC0zNy40OTQgMTcuMTA3IDAgMjYuOTQ5IDEwLjMxMSAyNy44ODcgMjUuNzc3aC00NC4yOXYxNy44MTFoNjguNDI2di0xMS43MThjMC0zMi41NzMtMjEuNTU5LTUzLjY2My01Mi4yNTctNTMuNjYzLTI4LjU4OCAwLTU2LjAwNiAxOS40NS01Ni4wMDYgNTkuMjg3IDAgMzkuODM2IDI3LjQxOCA1OS4yODYgNTYuMDA2IDU5LjI4NiAyNi4xNDkgMCA0NC43OTUtMTYuMTA3IDUwLjU4OC0zNy44M2gtMjQuNDE3ek0xNjguOTQ1IDQ2Ljg5OWMtMjYuOTQ4IDAtNDcuMTAxIDE0LjA2Mi00OS40NDQgMzUuNjE5aDI2LjQ3OWMxLjg3NS03Ljk2NiA5LjEzOS0xMy44MjQgMjIuOTY1LTEzLjgyNCAxNy44MSAwIDIzLjY2OCA5LjM3NSAyMy42NjggMjAuODU2djM4LjY2M2MtMTAuMDc2IDExLjQ4NC0yMS43OTMgMTYuODcyLTMzLjUxIDE2Ljg3Mi0xMi4xODUgMC0yMC42MjEtNS44NTgtMjAuNjIxLTE2LjQwMSAwLTEwLjA3OSA2LjU2MS0xNi40MDQgMTkuMjE1LTE2LjQwNGgxOS42ODRWOTQuNDY5aC0yMC4zODdjLTI4LjEyIDAtNDMuODIgMTQuMDYyLTQzLjgyIDM1LjYxOSAwIDIwLjE1MiAxNS4yMzEgMzUuMzg0IDQwLjMwNSAzNS4zODQgMTQuMDYgMCAyNi40OC01LjYyMiAzNS42MTktMTIuNDJoMy41MTV2OS42MDhoMjQuNjA1Vjg3LjIwNWMwLTI3Ljg4Ni0xOC45ODEtNDAuMzA2LTQ4LjI3My00MC4zMDZ6TTIgMTYyLjY2aDI0LjYwNVY4SDJ2MTU0LjY2ek0xMDUuMzQxIDQ5LjcxMUg3NS4zNDdMMzkuNDk0IDk2LjgxNHYxNC43NjNsMzYuNzkgNTEuMDgzaDMwLjQ2M0w2My42MyAxMDQuMDc3bDQxLjcxMS01NC4zNjZ6bTg4OS40NzYgMEw5NzQuNjY0IDk0LjQ3Yy00LjkyMSAxMC43ODEtOS42MDUgMjEuMzI0LTExLjAxMiAyOC4zNTZoLTMuNTE4Yy0xLjQwNi03LjAzMi02LjMyNS0xNy4zNDItMTEuMjQ2LTI4LjEybC0yMC4xNTMtNDQuOTk0aC0yNy4xODNsNDcuMzM2IDEwMS40NjctMjMuNDM0IDUxLjA4Nkg5NTEuN0wxMDIyIDQ5LjcxMWgtMjcuMTgzem0tOTguNzA3IDBoLTI5Ljk5NWwtMzUuODUzIDQ3LjEwM3YxNC43NjNsMzYuNzkgNTEuMDgzaDMwLjQ2NGwtNDMuMTE4LTU4LjU4MyA0MS43MTItNTQuMzY2em0tMTU0LjA1NCA0NS45M0w3MjUuNjUzIDk0Yy0xMi44ODktMS4xNzItMTkuNjg0LTQuNjg3LTE5LjY4NC0xMi4xODYgMC04LjkwNSA4LjY3LTE0LjA2IDIxLjA5LTE0LjA2IDEyLjg4OCAwIDIxLjA5IDYuMDkzIDIxLjc5MyAxNC43NjNoMjMuNjY3Yy0uOTM3LTIyLjAyNy0xOC4wNDMtMzUuNjE5LTQ1LjIyNi0zNS42MTktMjcuNDE3IDAtNDUuOTI5IDE0LjUzLTQ1LjkyOSAzNS44NTMgMCAxNy44MSAxMS4yNDggMjkuMjkyIDM2Ljc5IDMxLjg3bDE2LjYzOCAxLjY0YzEwLjA3Ni45MzcgMTYuODcyIDMuMDQ2IDE2Ljg3MiAxMi42NTQgMCA4LjY3MS02LjMyNyAxNC45OTctMjIuOTY1IDE0Ljk5Ny0xNS4zMjEgMC0yMi44Ny02Ljk1Mi0yNS41MTktMTYuMjcxaC0yNS42MDVjMi41NTEgMjEuMzAyIDIwLjQ0NiAzNy44MyA1MS4xMjQgMzcuODMgMjguODIzIDAgNDcuNTctMTUuMjMyIDQ3LjU3LTM3LjcyNyAwLTE5LjkxOS0xMy4xMjMtMjkuOTk1LTM0LjIxMy0zMi4xMDR6bTUwLjcxMiA2Ny4wMTloMjQuNjA1VjhoLTI0LjYwNXYxNTQuNjZ6TTYzMC41MTYgNjIuODM2aC0zLjUxNVY0OS43MWgtMjQuNjA1VjE2Mi42NmgyNC42MDV2LTU5LjA1MmMwLTIwLjE1MyA5LjMxMi0zMS44NyAyNy42NTItMzEuODdoMTUuNTc2VjQ2LjloLTkuMDE1Yy0xNy4wMTcgMC0yNC4yNDkgNi40MTgtMzAuNjk4IDE1LjkzN3oiIGZpbGw9IiMwMDZENUMiLz48L3N2Zz4=',
    // slogan: ''
  }

}
