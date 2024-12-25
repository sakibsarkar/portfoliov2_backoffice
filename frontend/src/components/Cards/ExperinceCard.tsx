import { IExperience } from "@/types/experience";
import { GoBriefcase } from "react-icons/go";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
const ExperinceCard = ({ experience }: { experience: IExperience }) => {
  return (
    <Card className="bg-[#161b22] border-[#30363d]">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 bg-[#00ffff]/10">
            <GoBriefcase className="h-5 w-5 text-[#00ffff]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold text-white">
                {experience.title}
              </h3>
              <Badge
                variant="secondary"
                className="bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20"
              >
                {experience.period}
              </Badge>
            </div>
            <p className="text-gray-400">{experience.company}</p>
            <p className="text-gray-400 leading-relaxed">
              {experience.description}
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              {experience.skills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperinceCard;
