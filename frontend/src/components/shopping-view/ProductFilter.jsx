import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Fragment } from "react";
function ProductFilter({filters,handleFilter}) {
  const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
    brand: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  };
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2 ">
                    <Checkbox 
                    checked={
                      filters && 
                      Object.keys(filters).length>0 && filters[keyItem] &&
                      filters[keyItem].indexOf(option.id)>-1
                    }
                    onCheckedChange={()=>handleFilter(keyItem,option.id)}
                    // className="w-5 h-5  border-black rounded-sm bg-white checked:bg-black  "
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>

    

  );
}

export default ProductFilter;
