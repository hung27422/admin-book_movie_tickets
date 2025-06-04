import snacksServices from "@/services/snackServices";
import { ISnack, ISnackByPageAndLimit } from "@/types/Snack";
import useSWR from "swr";

interface UseSnackProps {
  cinemaId?: string;
  name?: string;
  page?: number;
  limit?: number;
}

function useSnacks({ name, cinemaId, page, limit }: UseSnackProps = {}) {
  // Lấy tất cả snacks theo cinemaId
  const { data: snackAll, error, mutate } = useSWR<ISnack[]>("/snacks/getAll");

  const { data: snacks } = useSWR<ISnackByPageAndLimit>(
    page && limit ? `/snacks?page=${page}&limit=${limit}` : null
  );

  // Lấy snacks theo tên (search)
  const { data: dataSnackByName } = useSWR<ISnack[]>(name && `/snacks/search?name=${name}`);

  // Lấy snacks theo cinemaId
  const { data: dataSnacksByCinema } = useSWR<ISnack[]>(cinemaId && `/snacks/${cinemaId}`);

  const addSnack = async (snack: ISnack) => {
    try {
      const newSnack = await snacksServices.addSnack(snack);
      mutate(); // cập nhật lại danh sách
      return newSnack;
    } catch (error) {
      console.error("Lỗi khi thêm snack:", error);
      throw error;
    }
  };

  const updateSnack = async (id: string, snack: ISnack) => {
    try {
      const updated = await snacksServices.updateSnack(id, snack);
      mutate();
      return updated;
    } catch (error) {
      console.error("Lỗi khi cập nhật snack:", error);
      throw error;
    }
  };

  const deleteSnack = async (id: string) => {
    try {
      await snacksServices.deleteSnack(id);
      mutate();
    } catch (error) {
      console.error("Lỗi khi xóa snack:", error);
      throw error;
    }
  };

  return {
    snacks,
    snackAll,
    dataSnackByName,
    dataSnacksByCinema,
    error,
    addSnack,
    updateSnack,
    deleteSnack,
  };
}

export default useSnacks;
