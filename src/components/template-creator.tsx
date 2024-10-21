import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown, X, Plus, Search } from "lucide-react";

const allSections = Array.from({ length: 500 }, (_, i) => `Section ${i + 1}`);

export function TemplateCreatorComponent() {
  const [templateName, setTemplateName] = useState("");
  const [selectedSections, setSelectedSections] = useState<
    { name: string; sortOrder: number }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checkedSections, setCheckedSections] = useState<string[]>([]);

  const availableSections = useMemo(() => {
    return allSections.filter(
      (section) =>
        !selectedSections.some((selected) => selected.name === section) &&
        section.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedSections, searchQuery]);

  const handleCheckSection = (sectionName: string, isChecked: boolean) => {
    setCheckedSections((prev) =>
      isChecked
        ? [...prev, sectionName]
        : prev.filter((name) => name !== sectionName)
    );
  };

  const handleAddSections = () => {
    const newSections = checkedSections.map((name, index) => ({
      name,
      sortOrder: selectedSections.length + index,
    }));
    setSelectedSections((prev) => [...prev, ...newSections]);
    setCheckedSections([]);
    setIsDialogOpen(false);
  };

  const handleRemoveSection = (index: number) => {
    setSelectedSections((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((section, i) => ({ ...section, sortOrder: i }))
    );
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === selectedSections.length - 1)
    ) {
      return;
    }

    setSelectedSections((prev) => {
      const newSections = [...prev];
      const temp = newSections[index];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      newSections[index] = newSections[targetIndex];
      newSections[targetIndex] = temp;
      return newSections.map((section, i) => ({ ...section, sortOrder: i }));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const template = {
      name: templateName,
      sections: selectedSections,
    };
    console.log(JSON.stringify(template, null, 2));
    // Here you would typically send the data to your backend or perform further actions
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8"
    >
      <Card className="bg-background">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Create Template
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="templateName" className="text-lg font-medium">
              Template Name
            </Label>
            <Input
              id="templateName"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              required
              className="text-lg"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-medium">Sections</Label>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sections
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Sections</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search sections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <ScrollArea className="h-[300px] border rounded-md">
                      <div className="p-4 space-y-2">
                        {availableSections.map((section) => (
                          <div
                            key={section}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={section}
                              checked={checkedSections.includes(section)}
                              onCheckedChange={(checked) =>
                                handleCheckSection(section, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={section}
                              className="text-sm cursor-pointer"
                            >
                              {section}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {checkedSections.length} section(s) selected
                      </span>
                      <Button
                        onClick={handleAddSections}
                        disabled={checkedSections.length === 0}
                      >
                        Add Selected Sections
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section Name</TableHead>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSections.map((section, index) => (
                  <TableRow key={index}>
                    <TableCell>{section.name}</TableCell>
                    <TableCell>{section.sortOrder + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleMoveSection(
                              index,
                              index === 0 ? "down" : "up"
                            )
                          }
                          className="h-8 w-8"
                        >
                          <ArrowUpDown className="h-4 w-4" />
                          <span className="sr-only">Move section</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSection(index)}
                          className="h-8 w-8 text-destructive"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove section</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full text-lg py-6">
            Create Template
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
