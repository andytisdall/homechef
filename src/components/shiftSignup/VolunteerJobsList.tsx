import { Text, FlatList } from "react-native";
import { useMemo } from "react";

import styles from "./styles";
import Loading from "../reusable/Loading";
import { useGetShiftsQuery } from "../../state/apis/volunteerApi";
import RegionList from "./RegionList";

const VolunteerJobsList = () => {
  const { data, isLoading } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const sortedJobs = jobs
    ?.filter((job) => job.ongoing)
    .sort((a) => (a.active ? -1 : 1));

  const regions = useMemo(
    () =>
      Array.from(
        new Set(jobs?.filter((j) => j.region).map((j) => j.region!))
      ).sort((a) => (a === "CK Kitchen" ? -1 : 1)),
    [jobs]
  );

  const listData = useMemo(
    () =>
      sortedJobs
        ? regions.map((region) => (
            <RegionList
              fridges={sortedJobs.filter((j) => j.region === region)}
              title={region}
            />
          ))
        : [<Text>No jobs could be found.</Text>],
    [regions, sortedJobs]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      contentContainerStyle={[styles.jobList]}
      data={listData}
      renderItem={({ item }) => item}
    />
  );
};

export default VolunteerJobsList;
