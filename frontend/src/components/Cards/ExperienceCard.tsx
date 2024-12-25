import { IExperience } from "@/types/experience";
import { GoBriefcase } from "react-icons/go";
import DeleteExperience from "../Experience/DeleteExperience";
import { UpdateExperience } from "../Experience/UpdateExperience";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
const ExperienceCard = ({ experience }: { experience: IExperience }) => {
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 bg-primary text-white">
            <GoBriefcase className="h-5 w-5 " />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold text-primary">
                {experience.title}
              </h3>
              <Badge variant="secondary">{experience.period}</Badge>
            </div>
            <p className="text-primary">{experience.company}</p>
            <p className="text-gray-400 leading-relaxed">
              {experience.description}
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              {experience.skills.map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-[15px]">
          <UpdateExperience experience={experience} />
          <DeleteExperience
            experienceId={experience._id}
            experienceTitle={experience.title}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
