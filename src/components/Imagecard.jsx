function ImageCard({ image }) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative pb-[56.25%]">
          {" "}
          {/* 16:9 aspect ratio */}
          <img
            src={image.download_url || "/placeholder.svg"}
            alt={`Photo by ${image.author}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-gray-700 font-medium">Photo by {image.author}</p>
          <p className="text-gray-500 text-sm mt-1">ID: {image.id}</p>
          <a
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
          >
            View Original
          </a>
        </div>
      </div>
    )
  }
  
  export default ImageCard
  
  