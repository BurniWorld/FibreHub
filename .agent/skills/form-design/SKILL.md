---
name: Form Design
description: Form patterns and input components for ISP workflows in CoreConnect
---

# Form Design Skill

Patterns for building forms in CoreConnect ISP workflows.

## Form Structure

### Basic Form Layout

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomerForm() {
  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Add New Customer</CardTitle>
        <CardDescription>
          Enter customer details for RICA registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Form fields */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Customer</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Two-Column Layout

```tsx
<div className="grid gap-6 md:grid-cols-2">
  <div className="space-y-2">
    <Label htmlFor="firstName">First Name</Label>
    <Input id="firstName" placeholder="John" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="lastName">Last Name</Label>
    <Input id="lastName" placeholder="Doe" />
  </div>
</div>
```

## Input Components

### Text Input

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="customer@example.com"
    className="bg-background/50"
  />
  <p className="text-sm text-muted-foreground">
    Used for billing and notifications
  </p>
</div>
```

### Phone Input (SA Format)

```tsx
<div className="space-y-2">
  <Label htmlFor="phone">Phone Number</Label>
  <div className="flex">
    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">
      +27
    </span>
    <Input 
      id="phone" 
      placeholder="82 123 4567"
      className="rounded-l-none"
    />
  </div>
</div>
```

### SA ID Number Input

```tsx
<div className="space-y-2">
  <Label htmlFor="idNumber">SA ID Number</Label>
  <Input 
    id="idNumber" 
    placeholder="9001015009087"
    maxLength={13}
    pattern="[0-9]{13}"
  />
  <p className="text-sm text-muted-foreground">
    Required for RICA verification
  </p>
</div>
```

### Select Dropdown

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<div className="space-y-2">
  <Label>Province</Label>
  <Select>
    <SelectTrigger className="bg-background/50">
      <SelectValue placeholder="Select province" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="gauteng">Gauteng</SelectItem>
      <SelectItem value="western-cape">Western Cape</SelectItem>
      <SelectItem value="kzn">KwaZulu-Natal</SelectItem>
      <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
      <SelectItem value="free-state">Free State</SelectItem>
      <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
      <SelectItem value="limpopo">Limpopo</SelectItem>
      <SelectItem value="north-west">North West</SelectItem>
      <SelectItem value="northern-cape">Northern Cape</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### FNO Selection

```tsx
<div className="space-y-2">
  <Label>Fibre Network Operator</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select FNO" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="vumatel">Vumatel</SelectItem>
      <SelectItem value="openserve">Openserve</SelectItem>
      <SelectItem value="frogfoot">Frogfoot</SelectItem>
      <SelectItem value="octotel">Octotel</SelectItem>
      <SelectItem value="evotel">Evotel</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Currency Input (ZAR)

```tsx
<div className="space-y-2">
  <Label htmlFor="amount">Amount</Label>
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      R
    </span>
    <Input 
      id="amount" 
      type="number"
      placeholder="0.00"
      className="pl-8"
      step="0.01"
    />
  </div>
</div>
```

## Address Form

```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label>Address Line 1</Label>
    <Input placeholder="123 Main Street" />
  </div>
  
  <div className="space-y-2">
    <Label>Address Line 2</Label>
    <Input placeholder="Unit 4A (optional)" />
  </div>
  
  <div className="grid gap-4 md:grid-cols-3">
    <div className="space-y-2">
      <Label>City</Label>
      <Input placeholder="Johannesburg" />
    </div>
    <div className="space-y-2">
      <Label>Province</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {/* Province options */}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label>Postal Code</Label>
      <Input placeholder="2000" maxLength={4} />
    </div>
  </div>
</div>
```

## Validation States

### Error State

```tsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-destructive">
    Email Address
  </Label>
  <Input 
    id="email" 
    className="border-destructive focus-visible:ring-destructive"
    aria-invalid="true"
  />
  <p className="text-sm text-destructive">
    Please enter a valid email address
  </p>
</div>
```

### Success State

```tsx
<div className="space-y-2">
  <Label htmlFor="idNumber" className="text-success">
    SA ID Number ✓
  </Label>
  <Input 
    id="idNumber" 
    className="border-success"
    disabled
    value="9001015009087"
  />
  <p className="text-sm text-success">
    ID verified successfully
  </p>
</div>
```

## Form Sections

### Section with Divider

```tsx
<div className="space-y-6">
  {/* Section 1 */}
  <div>
    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
    {/* Fields */}
  </div>
  
  <Separator />
  
  {/* Section 2 */}
  <div>
    <h3 className="text-lg font-medium mb-4">Address Details</h3>
    {/* Fields */}
  </div>
</div>
```

## Form Actions

```tsx
<div className="flex items-center justify-between pt-6 border-t">
  <Button variant="ghost" type="button">
    Cancel
  </Button>
  <div className="flex gap-3">
    <Button variant="outline" type="button">
      Save as Draft
    </Button>
    <Button type="submit">
      Submit
    </Button>
  </div>
</div>
```

## Loading States

```tsx
import { Loader2 } from "lucide-react";

<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Submitting...
</Button>
```

## Checklist

- [ ] Labels associated with inputs (htmlFor/id)
- [ ] Placeholders provide examples
- [ ] Helper text explains requirements
- [ ] Error messages are specific
- [ ] Proper input types (email, tel, number)
- [ ] Keyboard navigation works
- [ ] Loading states for async actions
