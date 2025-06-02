import { IHotMovie, IRevenueStatisticResponse, IStatistic } from "@/types/Statistics";
import useSWR from "swr";

interface useStatisticsProps {
  from?: string;
  to?: string;
}

function useStatistics({ from, to }: useStatisticsProps = {}) {
  const { data: statistics } = useSWR<IStatistic>(
    from && to ? `/statistics?from=${from}&to=${to}` : "/statistics"
  );

  //
  const { data: hotMovies } = useSWR<IHotMovie>("statistics/hot-movies");
  //
  const { data: statisticsByCinemas } = useSWR<IRevenueStatisticResponse>(
    from && to ? `statistics/by-cinemas?from=${from}&to=${to}` : "statistics/by-cinemas"
  );

  return {
    hotMovies,
    statistics,
    statisticsByCinemas,
  };
}

export default useStatistics;
