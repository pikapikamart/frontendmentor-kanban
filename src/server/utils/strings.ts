

export const sanitizeString = (s: string) => (
  s.replace(/^\s+|\s+(?=\s)/g, '')
)

export const removeWhitespace = ( s: string ) => (
  s.replace(/\s+/g, '')
    .trim()
)