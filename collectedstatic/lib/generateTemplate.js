export default function() {
  return {
    name: 'generate-template',
    async renderChunk(chunk) {
      console.log(chunk)
    }
  } 
}
