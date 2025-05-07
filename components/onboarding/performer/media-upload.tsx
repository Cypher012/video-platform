"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, X, ImageIcon, Film } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { MediaUploadData } from "@/types/onboarding"

interface MediaUploadProps {
  onNext: (data: MediaUploadData) => void
  onBack: () => void
  initialData?: Partial<MediaUploadData>
}

export function MediaUpload({ onNext, onBack, initialData = {} }: MediaUploadProps) {
  const [formData, setFormData] = useState<MediaUploadData>({
    photos: initialData.photos || [],
    videos: initialData.videos || [],
    photoDescriptions: initialData.photoDescriptions || {},
    videoDescriptions: initialData.videoDescriptions || {},
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const [currentDescription, setCurrentDescription] = useState("")
  const [currentMediaId, setCurrentMediaId] = useState("")

  const simulateUpload = (type: "photo" | "video") => {
    const id = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    setIsUploading((prev) => ({ ...prev, [id]: true }))
    setUploadProgress((prev) => ({ ...prev, [id]: 0 }))

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = Math.min(prev[id] + 10, 100)

        if (newProgress === 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading((prev) => ({ ...prev, [id]: false }))
            setFormData((prev) => ({
              ...prev,
              [type === "photo" ? "photos" : "videos"]: [...prev[type === "photo" ? "photos" : "videos"], id],
            }))
            setCurrentMediaId(id)
          }, 500)
        }

        return { ...prev, [id]: newProgress }
      })
    }, 300)
  }

  const handleRemoveMedia = (id: string, type: "photo" | "video") => {
    setFormData((prev) => ({
      ...prev,
      [type === "photo" ? "photos" : "videos"]: prev[type === "photo" ? "photos" : "videos"].filter(
        (item) => item !== id,
      ),
      [type === "photo" ? "photoDescriptions" : "videoDescriptions"]: {
        ...prev[type === "photo" ? "photoDescriptions" : "videoDescriptions"],
        [id]: undefined,
      },
    }))
  }

  const handleSaveDescription = () => {
    if (!currentMediaId || !currentDescription.trim()) return

    const type = currentMediaId.startsWith("photo") ? "photoDescriptions" : "videoDescriptions"

    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [currentMediaId]: currentDescription,
      },
    }))

    setCurrentDescription("")
    setCurrentMediaId("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (formData.photos.length === 0) {
      newErrors.photos = "Please upload at least one photo"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Proceed to next step
    onNext(formData)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Upload Media</CardTitle>
        <CardDescription className="text-rose-100/70">
          Upload photos and videos to showcase yourself to potential clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-rose-100">
                Photos <span className="text-rose-500">*</span>
              </Label>
              <p className="text-xs text-rose-100/70">{formData.photos.length}/10 photos</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formData.photos.map((photo) => (
                <div
                  key={photo}
                  className="relative group aspect-square bg-rose-950/20 border border-rose-500/30 rounded-lg overflow-hidden"
                >
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={() => {
                        setCurrentMediaId(photo)
                        setCurrentDescription(formData.photoDescriptions[photo] || "")
                      }}
                    >
                      Edit Description
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={() => handleRemoveMedia(photo, "photo")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  {formData.photoDescriptions[photo] && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-xs text-white truncate">
                      {formData.photoDescriptions[photo]}
                    </div>
                  )}
                </div>
              ))}

              {formData.photos.length < 10 && (
                <div className="aspect-square bg-rose-950/10 border border-dashed border-rose-500/30 rounded-lg flex flex-col items-center justify-center p-4">
                  {Object.keys(isUploading).some((key) => key.startsWith("photo") && isUploading[key]) ? (
                    <div className="space-y-2 w-full">
                      <p className="text-rose-100 text-center">Uploading...</p>
                      <Progress
                        value={
                          Object.keys(uploadProgress)
                            .filter((key) => key.startsWith("photo") && isUploading[key])
                            .map((key) => uploadProgress[key])[0]
                        }
                        className="h-2 bg-rose-950/50"
                        indicatorClassName="bg-rose-500"
                      />
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={() => simulateUpload("photo")}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                  )}
                </div>
              )}
            </div>
            {errors.photos && <p className="text-xs text-rose-500 mt-1">{errors.photos}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-rose-100">Videos (Optional)</Label>
              <p className="text-xs text-rose-100/70">{formData.videos.length}/5 videos</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formData.videos.map((video) => (
                <div
                  key={video}
                  className="relative group aspect-video bg-rose-950/20 border border-rose-500/30 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="h-8 w-8 text-rose-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={() => {
                        setCurrentMediaId(video)
                        setCurrentDescription(formData.videoDescriptions[video] || "")
                      }}
                    >
                      Edit Description
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={() => handleRemoveMedia(video, "video")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  {formData.videoDescriptions[video] && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-xs text-white truncate">
                      {formData.videoDescriptions[video]}
                    </div>
                  )}
                </div>
              ))}

              {formData.videos.length < 5 && (
                <div className="aspect-video bg-rose-950/10 border border-dashed border-rose-500/30 rounded-lg flex flex-col items-center justify-center p-4">
                  {Object.keys(isUploading).some((key) => key.startsWith("video") && isUploading[key]) ? (
                    <div className="space-y-2 w-full">
                      <p className="text-rose-100 text-center">Uploading...</p>
                      <Progress
                        value={
                          Object.keys(uploadProgress)
                            .filter((key) => key.startsWith("video") && isUploading[key])
                            .map((key) => uploadProgress[key])[0]
                        }
                        className="h-2 bg-rose-950/50"
                        indicatorClassName="bg-rose-500"
                      />
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={() => simulateUpload("video")}
                    >
                      <Film className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {currentMediaId && (
            <div className="space-y-3 bg-rose-950/20 border border-rose-900/30 rounded-lg p-4">
              <Label htmlFor="mediaDescription" className="text-rose-100">
                {currentMediaId.startsWith("photo") ? "Photo" : "Video"} Description
              </Label>
              <Textarea
                id="mediaDescription"
                placeholder="Add a description..."
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                  onClick={() => {
                    setCurrentDescription("")
                    setCurrentMediaId("")
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={handleSaveDescription}
                >
                  Save Description
                </Button>
              </div>
            </div>
          )}

          <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <h4 className="text-white font-medium">Media Guidelines</h4>
                <ul className="text-sm text-rose-100/70 mt-1 space-y-1 list-disc pl-4">
                  <li>Photos must be clear and high quality</li>
                  <li>You must be the only person in the photos/videos</li>
                  <li>No explicit nudity in profile photos</li>
                  <li>Videos should be 30-60 seconds long</li>
                  <li>Maximum file size: 10MB for photos, 100MB for videos</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
