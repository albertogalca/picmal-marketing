interface LemonSqueezyOrder {
  attributes: {
    user_email: string;
  };
}

interface LemonSqueezyResponse {
  data: LemonSqueezyOrder[];
  links?: {
    next?: string | null;
  };
}

/**
 * Fetches unique customer count from Lemon Squeezy API
 * Rounds down to nearest 10 for privacy (e.g., 194 -> 190, 186 -> 180)
 */
export async function getCustomerCount(): Promise<number> {
  const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY;

  if (!apiKey) {
    console.warn("LEMON_SQUEEZY_API_KEY not found, using fallback value");
    return 150; // Fallback value
  }

  try {
    const uniqueCustomers = new Set<string>();
    let nextUrl: string | null = "https://api.lemonsqueezy.com/v1/orders?page[size]=100";

    // Fetch all pages of orders
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Lemon Squeezy API error: ${response.status}`);
      }

      const data = (await response.json()) as LemonSqueezyResponse;

      // Add unique customer emails to set
      data.data.forEach((order) => {
        if (order.attributes.user_email) {
          uniqueCustomers.add(order.attributes.user_email);
        }
      });

      // Get next page URL (if exists)
      nextUrl = data.links?.next || null;
    }

    const exactCount = uniqueCustomers.size;

    // Round down to nearest 10 for privacy
    const roundedCount = Math.floor(exactCount / 10) * 10;

    console.log(
      `Lemon Squeezy: ${exactCount} unique customers (displaying ${roundedCount})`
    );

    return roundedCount;
  } catch (error) {
    console.error("Failed to fetch customer count from Lemon Squeezy:", error);
    return 150; // Fallback value
  }
}
