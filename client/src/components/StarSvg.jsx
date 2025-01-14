export function StarSvg ({percentage, index}) {
  // I got this wonderful idea on how to style a text with two different colors at the same time from this stackoverflow comment:
  // https://stackoverflow.com/a/34293307
  return (
    <>
      <svg className="w-8 h-8" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id={'gradient' + '-' + index}>
                <stop offset={percentage + '%'} stopColor="#FFC857"/>
                <stop offset={percentage + '%'} stopColor="#EDEDED"/>
            </linearGradient>
        </defs>
        <text x="0" y="20" fill={"url(#gradient-" + index + ")"} className="w-8 h-8" fontSize="30"
          >★</text>
      </svg>
    </>
  )
}