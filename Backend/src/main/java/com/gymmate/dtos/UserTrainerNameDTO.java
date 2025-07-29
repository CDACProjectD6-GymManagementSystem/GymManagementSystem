package com.gymmate.dtos;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserTrainerNameDTO {
    public  List<UserNameForReceptonistDTO> userNameList = new ArrayList<>();
    public List<TrainerNameForReceptionistDTO> trainerNameList = new ArrayList<>();
}
