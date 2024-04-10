import React from "react";
import { Skeleton } from "moti/skeleton";
import { Card } from "@ui/components";

type Props = {
  isLoading?: boolean;
};
const CardAttachment: React.FC<Props> = ({ isLoading }) => {
  const [visibleViewer, setVisibleViewer] = React.useState(false);
  const handleShowImage = () => {
    setVisibleViewer(true);
  };

  return (
    <Card>
      <Skeleton show={isLoading} colorMode="light"></Skeleton>
    </Card>
  );
};
