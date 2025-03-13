"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import ImageCard from "./components/ImageCard"
import "./index.css"

function App() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const observer = useRef()
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1)
          }
        },
        { threshold: 0.5 },
      )

      if (node) observer.current.observe(node)
    },
    [loading],
  )

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Using Picsum Photos API which is completely free and requires no authentication
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)

      if (!response.ok) {
        throw new Error("Failed to fetch images")
      }

      const data = await response.json()

      setImages((prevImages) => {
        // Filter out duplicates by id
        const newImages = data.filter((newImg) => !prevImages.some((prevImg) => prevImg.id === newImg.id))
        return [...prevImages, ...newImages]
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Infinite Scrolling Gallery</h1>

      {error && <div className="text-red-500 text-center mb-4">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => {
          if (images.length === index + 1) {
            return (
              <div ref={lastImageElementRef} key={`${image.id}-${index}`}>
                <ImageCard image={image} />
              </div>
            )
          } else {
            return <ImageCard key={`${image.id}-${index}`} image={image} />
          }
        })}
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  )
}

export default App

