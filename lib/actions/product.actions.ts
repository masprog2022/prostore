"use server";

import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

// Get latest products
export async function getLatestProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: LATEST_PRODUCTS_LIMIT,
    });
    return convertToPlainObject(products);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw error;
  }
}

// Get single product by its slug
export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { slug: slug },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return convertToPlainObject(product);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
}
