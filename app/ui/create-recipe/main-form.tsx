"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FormDataSchema } from "@/app/lib/recipe-schema";

type Inputs = z.infer<typeof FormDataSchema>;

// form variable type definitions
type FormValues = {
	recipeName: string;
	notes: string;
	directions: {
		stepInstructions: string;
	}[];
	ingredients: {
		ingredient: string;
		quantity: string;
		unit: string;
	}[];
	nutrition: {
		calories: string;
		carbs: string;
		protein: string;
		fat: string;
		sugar: string;
	}[];
};

// defining variables in each step of the "create recipe" process for the nagivation bar
const steps = [
	{
		id: "Step 1",
		name: "Recipe Name",
		fields: ["recipeName"],
	},
	{
		id: "Step 2",
		name: "Ingredients",
		fields: ["ingredient", "quantity", "unit"],
	},
	{
		id: "Step 3",
		name: "Directions",
		fields: ["stepInstructions"],
	},
	{
		id: "Step 4",
		name: "Nutrition",
		fields: ["calories", "carbs", "fat", "protein", "sugar"],
	},
	{
		id: "Step 5",
		name: "Notes",
		fields: ["recipeNotes"],
	},
	{
		id: "Step 6",
		name: "Confirmation",
		fields: ["recipe"],
	},
];

export default function RecipeForm(this: any) {
	const [previousStep, setPreviousStep] = useState(0);
	const [currentStep, setCurrentStep] = useState(0); // stores current step information
	const delta = currentStep - previousStep;

	// define default form values
	const form = useForm<FormValues>({
		defaultValues: {
			recipeName: "",
			directions: [{ stepInstructions: "" }],
			ingredients: [{ ingredient: "", quantity: "", unit: "" }],
			nutrition: [{ calories: "", fat: "", carbs: "", protein: "", sugar: "" }],
			notes: "",
		},
	});

	// setting up functions for react-hook-form
	const { register, control, handleSubmit, formState, trigger, reset } = form;
	const { errors } = formState;

	// useFieldArray to set up arrays for dynamic ingredients, directions, and nutrition information
	// ingredients
	const {
		fields: fieldIngredient,
		append: appendIngredient,
		remove: removeIngredient,
	} = useFieldArray({
		name: "ingredients",
		control,
	});

	// directions
	const {
		fields: fieldDirections,
		append: appendDirections,
		remove: removeDirections,
	} = useFieldArray({
		name: "directions",
		control,
	});

	// nutrition
	const {
		fields: fieldNutrition,
		append: appendNutrition,
		remove: removeNutrition,
	} = useFieldArray({
		name: "nutrition",
		control,
	});

	// submit to zod through react-hook-form, log to console, and reset form
	const processForm: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		reset;
	};

	// confirm data before submitting form
	const confirmForm: SubmitHandler<Inputs> = (data) => {
		var recipe = data;
	};

	// "next page" button function
	type FieldName = keyof Inputs;
	const next = async () => {
		const fields = steps[currentStep].fields;
		const output = await trigger(fields as FieldName[], { shouldFocus: true });

		if (!output) return;

		if (currentStep < steps.length) {
			if (currentStep === steps.length - 1) {
				await handleSubmit(processForm)();
			}
			setPreviousStep(currentStep);
			setCurrentStep((step) => step + 1);
		}
	};

	// "previous page" button function
	const prev = () => {
		if (currentStep > 0) {
			setPreviousStep(currentStep);
			setCurrentStep((step) => step - 1);
		}
	};

	return (
		<>
			{/* Current position in form */}
			<nav aria-label="progress">
				<ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
					{steps.map((step, index) => (
						<li key={step.name} className="md:flex-1">
							{currentStep > index ? (
								<div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
									<span className="text-sm font-medium text-sky-600 transition-colors ">
										{step.id}
									</span>
									<span className="text-sm font-medium">{step.name}</span>
								</div>
							) : currentStep === index ? (
								<div
									className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
									aria-current="step"
								>
									<span className="text-sm font-medium text-sky-600">
										{step.id}
									</span>
									<span className="text-sm font-medium">{step.name}</span>
								</div>
							) : (
								<div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
									<span className="text-sm font-medium text-gray-500 transition-colors">
										{step.id}
									</span>
									<span className="text-sm font-medium">{step.name}</span>
								</div>
							)}
						</li>
					))}
				</ol>
			</nav>

			{/* Form */}
			<form
				className="my-10 rounded-md bg-gray-50 p-4 md:p-6"
				onSubmit={handleSubmit(processForm)}
			>
				{/* RECIPE TITLE */}
				{currentStep === 0 && (
					<div className="mb-4">
						<label htmlFor="amount" className="mb-2 block text-sm font-medium">
							Recipe Name
						</label>
						<div className="relative mt-2 rounded-md">
							<div className="relative">
								<input
									type="text"
									id="recipeName"
									{...register("recipeName")}
									placeholder="Enter recipe title here..."
									className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								/>
								{errors.recipeName?.message && (
									<p className="mt-2 text-sm text-red-400">
										{errors.recipeName.message}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{/* INGREDIENTS */}
				{currentStep === 1 && (
					<div className="mb-4">
						<label htmlFor="amount" className="mb-2 block text-sm font-medium">
							Ingredients
						</label>

						<div className="relative mt-2  rounded-md">
							{fieldIngredient.map((field, index) => {
								return (
									<div key={field.id} className="grid grid-cols-4 gap-2">
										<div className="relative">
											<input
												id="ingredientName"
												placeholder="Enter ingredients here..."
												{...register(
													`ingredients.${index}.ingredient` as const
												)}
												className="w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
											/>
										</div>
										<div className="relative">
											<input
												id="ingredientQty"
												placeholder="qty"
												{...register(`ingredients.${index}.quantity` as const)}
												className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
											/>
										</div>
										<div className="relative">
											<input
												id="ingredientUnit"
												placeholder="unit"
												{...register(`ingredients.${index}.unit` as const)}
												className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
											/>
										</div>
										{index > 0 && (
											<Button onClick={() => removeIngredient(index)}>
												delete ingredient
											</Button>
										)}
									</div>
								);
							})}
						</div>

						<Button
							className="my-5"
							type="button"
							onClick={() =>
								appendIngredient({ ingredient: "", quantity: "", unit: "" })
							}
						>
							{" "}
							+ Add Another Ingredient{" "}
						</Button>
					</div>
				)}

				{/* DIRECTIONS */}
				{currentStep === 2 && (
					<div className="mb-4">
						<label
							htmlFor="directions"
							className="mb-2 block text-sm font-medium"
						>
							Directions
						</label>

						<div className="relative mt-2 rounded-md">
							{fieldDirections.map((field, index) => {
								return (
									<div key={field.id}>
										Step {index + 1}
										<input
											key="id"
											type="text"
											{...register(`directions.${index}.stepInstructions`)}
											placeholder="Enter directions here..."
											className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
										/>
										{index > 0 && (
											<Button
												onClick={() => removeDirections(index)}
												className="my-5"
											>
												delete step {index + 1}
											</Button>
										)}
									</div>
								);
							})}
						</div>

						<Button
							onClick={() => appendDirections({ stepInstructions: "" })}
							className="my-5"
							type="button"
						>
							+ Add Another Step
						</Button>
					</div>
				)}

				{/* NUTRITION */}
				{currentStep === 3 && (
					<div className="mb-4">
						<label
							htmlFor="nutrition"
							className="mb-2 block text-sm font-medium"
						>
							Nutrition (optional, press next to skip)
						</label>
						<div className="relative mt-2 rounded-md">
							<div className="relative">
								<input
									id="nutrition"
									name="amount"
									step="0.01"
									placeholder="Enter nutrition details here..."
									className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								/>
							</div>
						</div>
					</div>
				)}

				{/* NOTES */}
				{currentStep === 4 && (
					<div className="mb-4">
						<label htmlFor="amount" className="mb-2 block text-sm font-medium">
							Notes
						</label>
						<div className="relative mt-2 rounded-md">
							<div className="relative">
								<input
									id="notes"
									{...register("notes")}
									placeholder="Enter recipe notes here..."
									className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								/>
							</div>
						</div>
					</div>
				)}

				{/* 
         CONFIRM RECIPE DETAILS
        {currentStep === 5 && (
          <div>
            <p> Confirm your recipe </p>
            <p> test </p>
          </div>
        )} */}

				{currentStep === 5 && (
					<div>
						<h2 className="text-center text-lg font-bold">
							Your recipe has been save. Select "Recipes" in the sidebar to view
							all of your recipes.
						</h2>
					</div>
				)}
			</form>

			{/* Nagivation */}

			<div className="mt-6 flex justify-center gap-4">
				{currentStep < 5 && (
					<Button onClick={prev} disabled={currentStep === 0}>
						Back
					</Button>
				)}

				{/* show "next" button for steps 1-4 */}
				{currentStep <= 3 && <Button onClick={next}>Next</Button>}

				{/* show "Confirm Recipe" button on step 5
        {currentStep === 4 && (
          <Button onClick={next}>Confirm Recipe Details</Button>
        )} */}

				{/* show "Save Recipe" button on final step */}
				{currentStep === 4 && <Button onClick={next}>Save Recipe</Button>}
			</div>
		</>
	);
}
