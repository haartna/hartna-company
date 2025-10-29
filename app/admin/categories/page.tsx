"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useData } from "@/lib/data-context"
import { Plus, Trash2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"

export default function AdminCategoriesPage() {
  const { t, language } = useLanguage()
  const { categories, addCategory, updateCategory, deleteCategory, addSubcategory, deleteSubcategory } = useData()
  const { toast } = useToast()
  const isRTL = language === "ar"

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null)
  const [editingCategoryParentId, setEditingCategoryParentId] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryNameAr, setNewCategoryNameAr] = useState("")
  const [newSubcategoryName, setNewSubcategoryName] = useState("")
  const [newSubcategoryNameAr, setNewSubcategoryNameAr] = useState("")
  const [addingSubcategoryTo, setAddingSubcategoryTo] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    const newCategory = {
      id: `cat-${Date.now()}`,
      name: newCategoryName,
      nameAr: newCategoryNameAr,
      subcategories: [],
    }

    addCategory(newCategory)
    setNewCategoryName("")
    setNewCategoryNameAr("")
    toast({
      title: "Success",
      description: "Category added successfully",
    })
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    }
  }

  const handleAddSubcategory = (categoryId: string) => {
    if (!newSubcategoryName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subcategory name",
        variant: "destructive",
      })
      return
    }

    addSubcategory(categoryId, {
      id: `subcat-${Date.now()}`,
      name: newSubcategoryName,
      nameAr: newSubcategoryNameAr,
    })

    setNewSubcategoryName("")
    setNewSubcategoryNameAr("")
    setAddingSubcategoryTo(null)
    toast({
      title: "Success",
      description: "Subcategory added successfully",
    })
  }

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      deleteSubcategory(categoryId, subcategoryId)
      toast({
        title: "Success",
        description: "Subcategory deleted successfully",
      })
    }
  }

  return (
    <div className={`p-8 ${isRTL ? "text-right" : ""}`}>
      <div className={`flex items-center justify-between mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("categories")}</h1>
          <p className="text-muted-foreground">{t("manageCategories")}</p>
        </div>
      </div>

      {/* Add New Category */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name (English)</Label>
              <Input
                id="categoryName"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryNameAr">Category Name (Arabic)</Label>
              <Input
                id="categoryNameAr"
                placeholder="أدخل اسم الفئة"
                value={newCategoryNameAr}
                onChange={(e) => setNewCategoryNameAr(e.target.value)}
                dir="rtl"
              />
            </div>
          </div>
          <Button onClick={handleAddCategory}>
            <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            Add Category
          </Button>
        </CardContent>
      </Card>

      {/* Categories List */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <CardTitle>{category.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className={`text-sm font-medium text-muted-foreground mb-3 ${isRTL ? "text-right" : ""}`}>
                  {t("subcategories")}:
                </p>
                {category.subcategories?.map((sub) => (
                  <div
                    key={sub.id}
                    className={`flex items-center justify-between p-2 rounded-lg bg-muted/50 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span className="text-sm">{sub.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteSubcategory(category.id, sub.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                ))}

                {addingSubcategoryTo === category.id ? (
                  <div className="space-y-2 mt-3 p-3 bg-muted rounded-lg">
                    <Input
                      placeholder="Subcategory name"
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                    />
                    <Input
                      placeholder="اسم الفئة الفرعية"
                      value={newSubcategoryNameAr}
                      onChange={(e) => setNewSubcategoryNameAr(e.target.value)}
                      dir="rtl"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAddSubcategory(category.id)}>
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setAddingSubcategoryTo(null)
                          setNewSubcategoryName("")
                          setNewSubcategoryNameAr("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 bg-transparent"
                    onClick={() => setAddingSubcategoryTo(category.id)}
                  >
                    <Plus className={`h-3 w-3 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("addSubcategory")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
