export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      "Pesquisa de Satisfação": {
        Row: {
          caso_queira_receber_um_retorno_sobre_sua_pesquisa_de_satisfa:
            | string
            | null
          data_de_início_do_curso: string | null
          data_de_término_do_curso: string | null
          q1_a_metodologia_de_ensino_utilizada_no_curso_estimulou_a_mi:
            | number
            | null
          q1_equipe_de_apoio: number | null
          q1_minha_presença_e_participação_no_curso: number | null
          q1_organização_planejamento_do_curso: number | null
          q1_qual_foi_o_seu_nível_de_aproveitamento_no_curso: string | null
          q2_a_metodologia_de_ensino_utilizada_no_curso_facilitou_a_ap:
            | number
            | null
          q2_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re:
            | number
            | null
          q2_estrutura_da_sala_de_aula: number | null
          q2_minha_postura_acadêmica_perante_a_turma: number | null
          q2_relacionamento_com_a_turma: number | null
          q3_conforto_e_climatização_do_ambiente: number | null
          q3_domínio_do_assunto_conhecimento: number | null
          q3_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re:
            | number
            | null
          q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion:
            | string
            | null
          q3_uso_de_aparelhos_eletrônicos: number | null
          q4_aplicabilidade_dos_conteúdos_abordados_em_sala: number | null
          q4_como_podemos_melhorar: string | null
          q4_meu_nível_de_aprendizado_e_autodesenvolvimento: number | null
          q5_didática_e_comunicação: number | null
          q5_escreva_seu_autofeedback_sobre_sua_participação: string | null
          q6_pontualidade_do_professor: number | null
          q7_escreva_seu_feedback_sobre_oa_professora: string | null
          qual_curso_você_deseja_avaliar: string | null
          respondent_id: string | null
          selecione_a_turma_que_você_está_estudando: string | null
          selecione_oa_professora_responsável_pelo_curso: string | null
          submission_id: string
          submitted_at: string | null
        }
        Insert: {
          caso_queira_receber_um_retorno_sobre_sua_pesquisa_de_satisfa?:
            | string
            | null
          data_de_início_do_curso?: string | null
          data_de_término_do_curso?: string | null
          q1_a_metodologia_de_ensino_utilizada_no_curso_estimulou_a_mi?:
            | number
            | null
          q1_equipe_de_apoio?: number | null
          q1_minha_presença_e_participação_no_curso?: number | null
          q1_organização_planejamento_do_curso?: number | null
          q1_qual_foi_o_seu_nível_de_aproveitamento_no_curso?: string | null
          q2_a_metodologia_de_ensino_utilizada_no_curso_facilitou_a_ap?:
            | number
            | null
          q2_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re?:
            | number
            | null
          q2_estrutura_da_sala_de_aula?: number | null
          q2_minha_postura_acadêmica_perante_a_turma?: number | null
          q2_relacionamento_com_a_turma?: number | null
          q3_conforto_e_climatização_do_ambiente?: number | null
          q3_domínio_do_assunto_conhecimento?: number | null
          q3_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re?:
            | number
            | null
          q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion?:
            | string
            | null
          q3_uso_de_aparelhos_eletrônicos?: number | null
          q4_aplicabilidade_dos_conteúdos_abordados_em_sala?: number | null
          q4_como_podemos_melhorar?: string | null
          q4_meu_nível_de_aprendizado_e_autodesenvolvimento?: number | null
          q5_didática_e_comunicação?: number | null
          q5_escreva_seu_autofeedback_sobre_sua_participação?: string | null
          q6_pontualidade_do_professor?: number | null
          q7_escreva_seu_feedback_sobre_oa_professora?: string | null
          qual_curso_você_deseja_avaliar?: string | null
          respondent_id?: string | null
          selecione_a_turma_que_você_está_estudando?: string | null
          selecione_oa_professora_responsável_pelo_curso?: string | null
          submission_id: string
          submitted_at?: string | null
        }
        Update: {
          caso_queira_receber_um_retorno_sobre_sua_pesquisa_de_satisfa?:
            | string
            | null
          data_de_início_do_curso?: string | null
          data_de_término_do_curso?: string | null
          q1_a_metodologia_de_ensino_utilizada_no_curso_estimulou_a_mi?:
            | number
            | null
          q1_equipe_de_apoio?: number | null
          q1_minha_presença_e_participação_no_curso?: number | null
          q1_organização_planejamento_do_curso?: number | null
          q1_qual_foi_o_seu_nível_de_aproveitamento_no_curso?: string | null
          q2_a_metodologia_de_ensino_utilizada_no_curso_facilitou_a_ap?:
            | number
            | null
          q2_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re?:
            | number
            | null
          q2_estrutura_da_sala_de_aula?: number | null
          q2_minha_postura_acadêmica_perante_a_turma?: number | null
          q2_relacionamento_com_a_turma?: number | null
          q3_conforto_e_climatização_do_ambiente?: number | null
          q3_domínio_do_assunto_conhecimento?: number | null
          q3_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re?:
            | number
            | null
          q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion?:
            | string
            | null
          q3_uso_de_aparelhos_eletrônicos?: number | null
          q4_aplicabilidade_dos_conteúdos_abordados_em_sala?: number | null
          q4_como_podemos_melhorar?: string | null
          q4_meu_nível_de_aprendizado_e_autodesenvolvimento?: number | null
          q5_didática_e_comunicação?: number | null
          q5_escreva_seu_autofeedback_sobre_sua_participação?: string | null
          q6_pontualidade_do_professor?: number | null
          q7_escreva_seu_feedback_sobre_oa_professora?: string | null
          qual_curso_você_deseja_avaliar?: string | null
          respondent_id?: string | null
          selecione_a_turma_que_você_está_estudando?: string | null
          selecione_oa_professora_responsável_pelo_curso?: string | null
          submission_id?: string
          submitted_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
