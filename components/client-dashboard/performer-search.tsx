"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, X } from "lucide-react"
import { ModelCard } from "@/components/model-card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function PerformerSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [minRating, setMinRating] = useState("0")

  const categories = [
    { id: "roleplay", label: "Roleplay" },
    { id: "conversation", label: "Conversation" },
    { id: "dancing", label: "Dancing" },
    { id: "gaming", label: "Gaming" },
    { id: "asmr", label: "ASMR" },
  ]

  const languages = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "russian", label: "Russian" },
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  const clearFilters = () => {
    setPriceRange([0, 100])
    setSelectedCategories([])
    setSelectedLanguages([])
    setOnlineOnly(false)
    setMinRating("0")
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl text-white">Find Performers</CardTitle>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-500" />
              <Input
                placeholder="Search performers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black/95 border-rose-900/50 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Filter Performers</SheetTitle>
                  <SheetDescription className="text-rose-100/70">
                    Customize your search to find the perfect match
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-rose-100">Price Range ($/min)</Label>
                      <div className="text-sm text-rose-400">
                        ${priceRange[0]} - ${priceRange[1]}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="[&>span]:bg-rose-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-rose-100">Categories</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                            className="border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                          />
                          <Label htmlFor={`category-${category.id}`} className="text-sm font-normal text-rose-100">
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-rose-100">Languages</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((language) => (
                        <div key={language.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`language-${language.id}`}
                            checked={selectedLanguages.includes(language.id)}
                            onCheckedChange={() => handleLanguageChange(language.id)}
                            className="border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                          />
                          <Label htmlFor={`language-${language.id}`} className="text-sm font-normal text-rose-100">
                            {language.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-rose-100">Minimum Rating</Label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger className="bg-rose-950/20 border-rose-500/30 text-white focus:ring-rose-500">
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border border-rose-500/30">
                        <SelectItem value="0" className="text-rose-100 focus:bg-rose-950/50 focus:text-white">
                          Any rating
                        </SelectItem>
                        <SelectItem value="3" className="text-rose-100 focus:bg-rose-950/50 focus:text-white">
                          3+ stars
                        </SelectItem>
                        <SelectItem value="4" className="text-rose-100 focus:bg-rose-950/50 focus:text-white">
                          4+ stars
                        </SelectItem>
                        <SelectItem value="4.5" className="text-rose-100 focus:bg-rose-950/50 focus:text-white">
                          4.5+ stars
                        </SelectItem>
                        <SelectItem value="5" className="text-rose-100 focus:bg-rose-950/50 focus:text-white">
                          5 stars only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="online-only"
                      checked={onlineOnly}
                      onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                      className="border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    />
                    <Label htmlFor="online-only" className="text-sm font-normal text-rose-100">
                      Show online performers only
                    </Label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      onClick={clearFilters}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.length > 0 &&
            selectedCategories.map((category) => (
              <div
                key={category}
                className="bg-rose-950/30 border border-rose-500/30 rounded-full px-3 py-1 text-sm text-rose-100 flex items-center"
              >
                {categories.find((c) => c.id === category)?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 text-rose-400 hover:text-rose-300 hover:bg-transparent p-0"
                  onClick={() => handleCategoryChange(category)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}

          {selectedLanguages.length > 0 &&
            selectedLanguages.map((language) => (
              <div
                key={language}
                className="bg-rose-950/30 border border-rose-500/30 rounded-full px-3 py-1 text-sm text-rose-100 flex items-center"
              >
                {languages.find((l) => l.id === language)?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 text-rose-400 hover:text-rose-300 hover:bg-transparent p-0"
                  onClick={() => handleLanguageChange(language)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}

          {onlineOnly && (
            <div className="bg-rose-950/30 border border-rose-500/30 rounded-full px-3 py-1 text-sm text-rose-100 flex items-center">
              Online Only
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 text-rose-400 hover:text-rose-300 hover:bg-transparent p-0"
                onClick={() => setOnlineOnly(false)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          )}

          {minRating !== "0" && (
            <div className="bg-rose-950/30 border border-rose-500/30 rounded-full px-3 py-1 text-sm text-rose-100 flex items-center">
              {minRating}+ <Star className="h-3 w-3 ml-1 fill-rose-500 text-rose-500" />
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 text-rose-400 hover:text-rose-300 hover:bg-transparent p-0"
                onClick={() => setMinRating("0")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          )}

          {(selectedCategories.length > 0 || selectedLanguages.length > 0 || onlineOnly || minRating !== "0") && (
            <Button
              variant="ghost"
              className="text-xs text-rose-400 hover:text-rose-300 hover:bg-transparent p-0 h-6"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ModelCard key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
          >
            Load More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
