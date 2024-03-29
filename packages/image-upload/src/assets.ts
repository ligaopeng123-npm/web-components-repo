import { isPreviewIcon } from "./utils";

/**********************************************************************
 *
 * @模块名称: assets
 *
 * @模块用途: assets
 *
 * @date: 2022/1/27 16:48
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export const delIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQzMjUzMTkxNDA2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzQxLjMxMiA4NS4zMTJsNjQtODUuMzEyaDIxMy4zNzZsNjQgODUuMzEySDk2MHY4NS4zNzZINjRWODUuMzEyaDI3Ny4zMTJ6TTE3MC42ODggMjU2aDY4Mi42MjR2NzY4SDE3MC42ODhWMjU2ek0yNTYgMzQxLjMxMnY1OTcuMzc2aDUxMlYzNDEuMzEySDI1NnogbTIxMy4zMTIgODUuMzc2djQyNi42MjRIMzg0VjQyNi42ODhoODUuMzEyeiBtMTcwLjY4OCAwdjQyNi42MjRINTU0LjY4OFY0MjYuNjg4SDY0MHoiIGZpbGw9IiNkODFlMDYiIHAtaWQ9IjIwNDQiPjwvcGF0aD48L3N2Zz4=';

export const previewIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArpJREFUWEftlkFS20AQRV9beB1uEG6As0ylEPIJYk5AOAFmmdhUTMVOlvgGcU6AOQHGKSrLiBOE3MBskeVOjbBcaDSyZW+oVDELLUY93X9+/+4e4ZmXPHN8XgD8fwx8+6U7ccSuCDVVto2GRJioEk5jrjt1mayjq9IMfB1rQ+EQaKwIMFQYtH25LANkJYDejdY05lwgKOMwtVEYeVWOPr6Vu2XnlgLoXWsH4fM6gXO2Qqe1J2dFPpwAOle6XfX4XoLustgGUcyJSx85AEnwClcINZd3hVsgFCVDrQo1UQKEV05UShjNqNsgMgCWBVf44VXprMrpXKxNYD8HxAEiA6A31pF9UOGveDRa7yRMHc6BHlJhuyi/3bE2Bc4dbAxbvhyk+wsAvWvtIxxnDij3bBE4gv9G2DG2LV8KhVwIQjlr7Usn6SHm8+WnBhXlykHZwjD9Z1eGwMEnX4ZFauyO9U7gde6/xxtzsQSAi3qzPxPqp3ti0rJYOdtHMfZFCB9ibm2ROZkFTJ9o+1JPAHTHapDs2ihLAXhyyGlf0EtMNbV9qSUA5sq9sAG46F2S1/toxo7NQHesQ4H3Rb4XAnIZpjQ9PWwqYMtjZDOmcNL2pf/U1gyuWcQfO7jCZduXZKYsABQ5BgYtX45sJ4lwZwQqTLwqQ7s/JMEfuLAbmqF+GhOkTGX7wI3WmDLKdTMlVKFTZsIlPWKLY53RFHkc14vlKOtcDZvp5wRhlKtMRBKAoZn/FUhmvyo105RUCQqnpiN4JgV27uIII55cZRTV+7J9Q7tXpeFq44VdbK6Jvjw+QjZeZoZMY5pFL6WVDxIjNlEMkLXYMLdWoWk3Mkc5lrtcb6wfFBqums7qjEsBM3AGZTyvZMB2YspLo+RBat4LqcqNOEOpEq4a1xszUOY2m9iszcAmQZadeQHw7Az8A2N4PjAAfKnfAAAAAElFTkSuQmCC`

export const uploadIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAcRJREFUWEftlt9twjAQxn0Oj0hlg4Y3iC2VDcoIdIN0gzIB7QTtBrBBGaFMUB4S4I10glKJR+KrHDmSCX/sGEtVJfKY5O775bu7+IA4XlEUxZTSVxkuhBguFouJSypwCVLiYz1WCPHoAlEb4Jh4CeICUQvgnLgrhDWAjbgLhBVAHfG6EEaAbrc7CILg3aVZ8zx/WC6X03OxRgDO+TchpFXteErpwRRU7xFCZkmS9C8F2BBCbqrWcs5RT5wkCVRLZTMVRgeiKOpRSj+kWJ7ncWnpMQD5Due8j4hPiDi1+S8YAU7Zdwqgbq/8PYCsGwCMJDkivtjYpqw+6AGbr1clkmdIS+oBY2wNAKECyNI0bVsmcgJgjH0CQK/UA9da+oq7Alwd+L8OMMbmAHCnxukrTdNilE1XdXoucUD+89/UUvpsOnZLMG8Api+1PUOcHbgC+HRgb+PZ7Xbt1WqVuQqci+t0OmGj0Vjr78gekNvOvXZzKoSQx/LcJ4QUD4JgBACxlnd2sMf5FDXlQsRhsREdccEU6+N5sTEXAGEYtprNptzf9VL4EDmVY7bdbgdZlm32dkK1VseIGALArWeCH0LIXAgx0de+X/IwP0q6D41SAAAAAElFTkSuQmCC';
