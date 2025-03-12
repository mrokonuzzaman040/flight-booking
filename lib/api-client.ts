type ApiResponse<T = any> = {
  success: boolean
  message?: string
  stats?: T
  data?: T
  error?: string
}

export const apiClient = {
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      // Build URL with query parameters if they exist
      let url = `/api${endpoint}`;
      if (params && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          if (value) searchParams.append(key, value);
        }
        url += `?${searchParams.toString()}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: errorData.message || "An error occurred",
        }
      }

      const data = await response.json()
      return {
        success: true,
        ...data,
      }
    } catch (error) {
      console.error(`API GET error for ${endpoint}:`, error)
      return {
        success: false,
        error: "Network error",
      }
    }
  },

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: errorData.message || "An error occurred",
        }
      }

      const data = await response.json()
      return {
        success: true,
        ...data,
      }
    } catch (error) {
      console.error(`API POST error for ${endpoint}:`, error)
      return {
        success: false,
        error: "Network error",
      }
    }
  },

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: errorData.message || "An error occurred",
        }
      }

      const data = await response.json()
      return {
        success: true,
        ...data,
      }
    } catch (error) {
      console.error(`API PUT error for ${endpoint}:`, error)
      return {
        success: false,
        error: "Network error",
      }
    }
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: errorData.message || "An error occurred",
        }
      }

      const data = await response.json()
      return {
        success: true,
        ...data,
      }
    } catch (error) {
      console.error(`API DELETE error for ${endpoint}:`, error)
      return {
        success: false,
        error: "Network error",
      }
    }
  },
}

